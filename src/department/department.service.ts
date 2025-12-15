import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { Department } from './entities/department.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(Department)
    private readonly departmentRepository: Repository<Department>,
  ) {}

  async findAll() {
    return await this.departmentRepository.find();
  }

  async findAllEmployees(id : number) {
    const departmentExist = await this.departmentRepository.findOne({where: {id}});

    if(!departmentExist){
      throw new NotFoundException("Department not exist");
    }
    const result = await this.departmentRepository.findOne({
      where: {id},
      relations : ['employees']
    });

    return result.employees;
  }

}
