import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './entities/employee.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Department } from '../department/entities/department.entity';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,

    @InjectRepository(Department)
    private readonly departmentRepository: Repository<Department>,
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto) {
    const departmentExist = await this.departmentRepository.findOne({
      where: { id: createEmployeeDto.departmentId },
    });

    if (!departmentExist) {
      throw new NotFoundException('Department not found');
    }
    const employeeExist = await this.employeeRepository.findOne({
      where: { email: createEmployeeDto.email },
    });

    if (employeeExist) {
      throw new ConflictException('User already exists');
    }

    const { departmentId, ...rest } = createEmployeeDto;

    const createdEmployee = this.employeeRepository.create({
      ...rest,
      department: departmentId ? ({ id: departmentId }) : null,
    });

    const saved = await this.employeeRepository.save(createdEmployee);

    return saved;
  }

  async findAll() {
    const employees = await this.employeeRepository.find({
      relations: ['department'],
    });
    return employees;
  }

  async findOne(id: number) {
    const employeeExist = await this.employeeRepository.findOne({
      where: {id}
    })

    if (!employeeExist){
      throw new NotFoundException('Emplopyee not found')
    }

    return employeeExist;
  }

  update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    return `This action updates a #${id} employee`;
  }

  remove(id: number) {
    return `This action removes a #${id} employee`;
  }
}
