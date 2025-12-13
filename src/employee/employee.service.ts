import { ConflictException, Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './entities/employee.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto) {
    const employeeExist = await this.employeeRepository.findOne({
      where: { email: createEmployeeDto.email },
    });

    if (employeeExist) {
      throw new ConflictException('User already exists');
    }

    const createdEmployee = this.employeeRepository.create(createEmployeeDto);
    const saved = await this.employeeRepository.save(createdEmployee);

    return saved;
  }

  async findAll() {
      const employees = await this.employeeRepository.find();
      return employees;
  }

  findOne(id: number) {
    return `This action returns a #${id} employee`;
  }

  update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    return `This action updates a #${id} employee`;
  }

  remove(id: number) {
    return `This action removes a #${id} employee`;
  }
}
