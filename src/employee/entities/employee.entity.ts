import {
  Check,
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { Department } from '../../department/entities/department.entity';
import { Exclude } from 'class-transformer';

@Entity()
@Unique(['email', 'deletedAt'])
@Check(`"salary" >= 0`)
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
    length: 254
  })
  email: string;

  @Column({
    nullable: false,
    length: 20
  })
  name: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
  })
  salary: number;

  @ManyToOne(() => Department, (department) => department.employees, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'department_id' })
  department: Department;

  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @Exclude()
  @DeleteDateColumn({
    name: 'deleted_at',
    nullable: true,
    type: 'timestamp',
  })
  deletedAt: Date;
}
