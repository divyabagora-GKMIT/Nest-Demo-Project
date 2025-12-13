import { AppDataSource } from '../data-source';
import { seedDepartments } from './seeds/department.seed';

async function runSeed() {
  await AppDataSource.initialize();
  console.log('DB connected');

  await seedDepartments(AppDataSource);
  await AppDataSource.destroy();
  console.log('Seeding completed');
}

runSeed().catch((err) => {
  console.error('Seeding failed', err);
});
