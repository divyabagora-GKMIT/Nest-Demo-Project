import { DataSource } from 'typeorm';
import { Department } from '../../department/entities/department.entity';

export async function seedDepartments(dataSource: DataSource) {
  const repo = dataSource.getRepository(Department);
    
  const count = await repo.count();

  if (count > 0) {
    console.log('Data already seeded');
    return;
  }

  const departments = repo.create([
    { name: 'HR' },
    { name: 'Tech' },
    { name: 'DM' },
    { name: 'Non-Tech' },
  ]);

  await repo.save(departments);
  console.log('Departments seeded successfully');
}
