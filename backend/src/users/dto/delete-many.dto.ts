import { IsArray } from 'class-validator';

export class DeleteManyDto {
  @IsArray()
  ids: number[];
}
