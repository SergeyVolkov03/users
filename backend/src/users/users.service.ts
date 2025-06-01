import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DeleteManyDto } from './dto/delete-many.dto';
import { UpdateManyDto } from './dto/update-many.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  updateMany(updateManyDto: UpdateManyDto) {
    return this.prisma.user.updateMany({
      where: { id: { in: updateManyDto.ids } },
      data: { is_blocked: updateManyDto.is_blocked },
    });
  }

  removeMany(deleteManyDto: DeleteManyDto) {
    return this.prisma.user.deleteMany({
      where: { id: { in: deleteManyDto.ids } },
    });
  }

  remove(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }
}
