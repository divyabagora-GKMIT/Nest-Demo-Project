import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateEmployeeDto {
  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @IsNotEmpty({ message: 'email is required' })
  @IsEmail()
  email: string;

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
