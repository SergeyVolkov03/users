import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { AuthEntity } from './entity/auth.entity';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string): Promise<AuthEntity> {
    const user = await this.prisma.user.findUnique({ where: { email: email } });

    if (!user) {
      throw new NotFoundException(`No user found for email: ${email}`);
    }

    const isPasswordValid = user.password === password;

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    if (user.is_blocked) {
      throw new UnauthorizedException('You are blocked');
    }

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        last_time_at: new Date(),
      },
    });

    return {
      accessToken: this.jwtService.sign({ userId: user.id }),
    };
  }

  async registration(
    email: string,
    password: string,
    name: string,
  ): Promise<AuthEntity> {
    const user = await this.prisma.user.findUnique({
      where: { email: email },
    });

    if (user) {
      throw new UnauthorizedException(
        `User with email: ${email} already exists`,
      );
    }

    const newUser = await this.prisma.user.create({
      data: {
        name,
        email,
        password,
        last_time_at: new Date(),
      },
    });

    return {
      accessToken: this.jwtService.sign({ userId: newUser.id }),
    };
  }
}
