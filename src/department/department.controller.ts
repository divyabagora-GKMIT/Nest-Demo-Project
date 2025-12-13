import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { IdValidationPipe } from '../pipes/idValidation.pipe';

@Controller('departments')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Get()
  async findAll() {
    return await this.departmentService.findAll();
  }

  @Get(':id/employees')
  async findAllEmployees(@Param('id' , new IdValidationPipe()) id: number) {
    const result =  await this.departmentService.findAllEmployees(id);
    return {
      message : "Employees fetch successfully",
      data : result
    }
  }

}
