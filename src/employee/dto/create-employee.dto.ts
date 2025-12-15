import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateEmployeeDto {
  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty({ message: 'Name is required' })
  @Length(3, 20, { message: 'Name must be between 3 and 20 characters' })
  name: string;

  @IsNotEmpty({ message: 'email is required' })
  @IsEmail({}, {message : 'email format is not correct'})
  @MaxLength(254)
  email: string;

  @Type(() => Number)
  @IsNumber({}, { message: 'salary must be a number' })
  @Min(0, { message: 'salary must be non-negative' })
  @Max(99999999.99, { message: 'salary cannot exceed 10 digits' })
  salary: number;

  @IsOptional()
  @Min(1, { message: 'departmentId must be at least 1' })
  @Max(4, { message: 'departmentId cannot be more than 4' })
  @IsNumber({}, { message: 'departmentId must be a number' })
  departmentId: number;
}
