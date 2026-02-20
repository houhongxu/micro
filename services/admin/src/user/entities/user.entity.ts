import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Role } from './role.entity';

@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    comment: '手机号',
    length: 20,
    nullable: true,
  })
  phone: string;

  @Column({
    comment: '用户名',
    length: 20,
    nullable: true,
  })
  username: string;

  @Column({
    comment: '密码',
    length: 50,
    nullable: true,
  })
  password: string;

  @Column({
    comment: '邮箱',
    length: 50,
    nullable: true,
  })
  email: string;

  @Column({
    comment: '头像',
    nullable: true,
  })
  head_picture: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToMany(() => Role)
  @JoinTable({
    name: 'user_roles',
  })
  roles: Role[];
}
