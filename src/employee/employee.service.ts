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
      department: departmentId ? { id: departmentId } : null,
    });

    const saved = await this.employeeRepository.save(createdEmployee);

    return saved;
  }

  async findAll(
    include: boolean,
    limit :number,
    page : number,
    sort: keyof Employee = 'createdAt',
    order: 'ASC' | 'DESC' = 'DESC'
  ) {
    const [employees, total] = await this.employeeRepository.findAndCount({
      relations: include ? ['department'] : [],
      order: { [sort]: order },
      skip: (page - 1) * limit,
      take: limit,
    });
    return {
      employees,
      limit,
      total: Math.ceil(total/limit),
      page,
    };
  }


  async findOne(id: number) {
    const employeeExist = await this.employeeRepository.findOne({
      where: { id },
    });

    if (!employeeExist) {
      throw new NotFoundException('Emplopyee not found');
    }

    return employeeExist;
  }

  async findAllEmployees(id: number) {
    const departmentExist = await this.departmentRepository.findOne({
      where: { id },
    });

    if (!departmentExist) {
      throw new NotFoundException('Department not exist');
    }

    const employees = await this.employeeRepository.find({
      where: { department: { id: id } },
    });

    return employees;
  }

  async update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    const employeeExist = await this.employeeRepository.findOne({
      where: { id },
      relations: ['department']
    });

    if (!employeeExist) {
      throw new NotFoundException('Emplopyee not found');
    } 

    if (updateEmployeeDto.departmentId){
      employeeExist.department.id = updateEmployeeDto.departmentId
    }
    const mergedEmployee = this.employeeRepository.merge(employeeExist, updateEmployeeDto)
    await this.employeeRepository.save(mergedEmployee);
    return;
  }

  async remove(id: number) {
    const employeeExist = await this.employeeRepository.findOne({
      where: { id },
    });
    console.log(employeeExist);

    if (!employeeExist) {
      throw new NotFoundException('Emplopyee not found');
    }

    await this.employeeRepository.softDelete(id);

    return;
  }
}
