import { Expose } from 'class-transformer';
import { RoleEnum } from 'src/common/enums/role.enum';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  avatar: string;

  @Column({ type: 'enum', enum: RoleEnum, default: RoleEnum.User })
  role: RoleEnum;

  @Expose({ name: 'created_at' })
  @CreateDateColumn({
    type: 'timestamp',
  })
  createdAt: Date;

  @Expose({ name: 'updated_at' })
  @UpdateDateColumn({
    type: 'timestamp',
  })
  updatedAt: Date;

  @Expose({ name: 'deleted_at' })
  @DeleteDateColumn({
    type: 'timestamp',
    nullable: true,
  })
  onDelete: Date;
}
