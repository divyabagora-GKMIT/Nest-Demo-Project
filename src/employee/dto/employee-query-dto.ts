import { Type } from 'class-transformer';
import { IsBoolean, IsIn, IsInt, IsOptional, Max, Min } from 'class-validator';

export class EmployeeQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'page must be an integer' })
  @Min(1, { message: 'page must be >= 1' })
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'limit must be an integer' })
  @Min(1, { message: 'limit must be >= 1' })
  @Max(20, { message: 'limit cannot more than 20' })
  limit?: number = 10;

  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean({ message: 'include must be true or false' })
  include?: boolean = false;

  @IsOptional()
  @IsIn(['ASC', 'DESC'], {
    message: 'order must be ASC or DESC',
  })
  order: 'ASC' | 'DESC' = 'DESC';
}
