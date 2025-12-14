import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeService } from './employee.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { Department } from '../department/entities/department.entity';
import { NotFoundException } from '@nestjs/common';

const mockEmployeeRepository = {
  findOne: jest.fn(),
  findAndCount: jest.fn(),
};
const mockDepartmentRepository = {
  find: jest.fn(),
};

describe('EmployeeService', () => {
  let service: EmployeeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmployeeService,
        {
          provide: getRepositoryToken(Employee),
          useValue: mockEmployeeRepository,
        },
        {
          provide: getRepositoryToken(Department),
          useValue: mockDepartmentRepository,
        },
      ],
    }).compile();

    service = module.get<EmployeeService>(EmployeeService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    it('should return employee if found', async () => {
      const employee = { id: 1, name: 'John' };

      mockEmployeeRepository.findOne.mockResolvedValue(employee);

      const result = await service.findOne(1);

      expect(mockEmployeeRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
      });

      expect(result).toEqual(employee);
    });

    it('should throw NotFoundException if employee not found', async () => {
      mockEmployeeRepository.findOne.mockResolvedValue(null);
      const result = service.findOne(1);

      expect(result).rejects.toThrow(NotFoundException);
    });
  });

  describe('findAll', () => {
    it('should return the employees with department relation', async () => {
      const employees = [{ id: 1, name: 'John' }];
      const totalCount = 10;
      mockEmployeeRepository.findAndCount.mockResolvedValue([
        employees,
        totalCount,
      ]);

      const result = await service.findAll(true, 5, 2, 'createdAt', 'DESC');

      expect(mockEmployeeRepository.findAndCount).toHaveBeenCalledWith({
        relations: ['department'],
        order: { createdAt: 'DESC' },
        skip: 5,
        take: 5,
      });

      expect(result).toEqual({
        employees,
        limit: 5,
        total: 2,
        page: 2,
      });
    });

    it('should return employee details only', async () => {
      const employees = [{ id: 1, name: 'divya' }];
      const totalCount = 10;

      mockEmployeeRepository.findAndCount.mockResolvedValue([
        employees,
        totalCount,
      ]);

      const result = await service.findAll(false, 5, 2, 'createdAt', 'DESC');
      expect(mockEmployeeRepository.findAndCount).toHaveBeenCalledWith({
        relations: [],
        order: { createdAt: 'DESC' },
        skip: 5,
        take: 5,
      });

      expect(result).toEqual({
        employees,
        limit: 5,
        total: 2,
        page: 2,
      });
    });
  });
});
