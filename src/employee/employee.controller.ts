import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { IdValidationPipe } from '../pipes/idValidation.pipe';

@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  async create(@Body() createEmployeeDto: CreateEmployeeDto) {
    const result = await this.employeeService.create(createEmployeeDto);
    return {
      message: 'User created successfully',
      data: result,
    };
  }

  @Get()
  async findAll() {
    const result = await this.employeeService.findAll();
    return {
      message: 'Employee fetched Successfully',
      data: result,
    };
  }

  @Get(':id')
  async findOne(@Param('id', new IdValidationPipe()) id: number) {
    const result = await this.employeeService.findOne(id);

    return {
      message: 'Employee fetched Successfully',
      data: result,
    };
  }

  @Patch(':id')
  async update(
    @Param('id', new IdValidationPipe()) id: number,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ) {
    await this.employeeService.update(id, updateEmployeeDto);

    return {
      message: 'Employee Updated successfully',
    };
  }

  @Delete(':id')
  remove(@Param('id', new IdValidationPipe()) id: number) {
    this.employeeService.remove(id);
    return {
      message: 'Employee deleted successfully',
    };
  }
}
