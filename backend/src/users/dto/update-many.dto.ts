import { IsArray, IsNotEmpty } from 'class-validator';

export class UpdateManyDto {
  @IsArray()
  ids: number[];

  @IsNotEmpty()
  is_blocked: boolean;
}
