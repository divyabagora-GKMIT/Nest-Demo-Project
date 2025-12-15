import { Test, TestingModule } from '@nestjs/testing';
import { DepartmentService } from './department.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Department } from './entities/department.entity';
import { NotFoundException } from '@nestjs/common';

const mockDepartmentRepository = {
  find: jest.fn(),
  findOne: jest.fn(),
};

describe('DepartmentService', () => {
  let service: DepartmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DepartmentService,
        {
          provide: getRepositoryToken(Department),
          useValue: mockDepartmentRepository,
        },
      ],
    }).compile();

    service = module.get<DepartmentService>(DepartmentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('it should return all departments', async () => {
      const departments = [{ id: 1, name: 'Tech' }];

      mockDepartmentRepository.find.mockResolvedValue(departments);

      const result = await service.findAll();

      expect(mockDepartmentRepository.find).toHaveBeenCalled();

      expect(result).toEqual(departments);
    });
  });

  describe('findAllEmployees', () => {
    it('it should return all employees in a department', async () => {
      const department = { id: 1, name: 'Tech' };
      const employees = [{ id: 1, name: 'divya' }];

      mockDepartmentRepository.findOne
        .mockResolvedValueOnce(department)
        .mockResolvedValueOnce({
          id: 2,
          employees,
        });

      const result = await service.findAllEmployees(2);

      expect(mockDepartmentRepository.findOne).toHaveBeenNthCalledWith(2, {
        where: { id: 2 },
        relations: ['employees'],
      });

      expect(result).toEqual(employees);
    });
  });

  it('should throw NotFoundException if department not found' , async() => {
    mockDepartmentRepository.findOne.mockResolvedValue(null);
    const result = service.findAllEmployees(2);
    expect(result).rejects.toThrow(NotFoundException);
  })
});
