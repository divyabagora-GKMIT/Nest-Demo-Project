import { PartialType, PickType } from '@nestjs/mapped-types';
import { CreateEmployeeDto } from './create-employee.dto';
import { Type } from 'class-transformer';
import {
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';

export class UpdateEmployeeDto extends PartialType(
  PickType(CreateEmployeeDto, ['name', 'salary', 'departmentId'] as const),
) {
  @IsString({ message: 'Name must be a string' })
  @Length(3, 20)
  name: string;

  @Type(() => Number)
  @IsNumber({}, { message: 'salary must be a number' })
  @Min(0, { message: 'salary must be non-negative' })
  salary: number;

  @IsOptional()
  @Min(1, { message: 'departmentId must be at least 1' })
  @Max(4, { message: 'departmentId cannot be more than 4' })
  @IsNumber({}, { message: 'departmentId must be a number' })
  departmentId: number;
}
