import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'menus',
})
export class Menu {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    comment: '菜单名称',
    length: 50,
  })
  name: string;

  @Column({
    comment: '菜单路径',
    length: 200,
    nullable: true,
  })
  path: string;

  @Column({
    comment: '菜单图标',
    length: 50,
    nullable: true,
  })
  icon: string;

  @Column({
    comment: '父菜单ID',
    nullable: true,
  })
  parentId: number | null;

  @ManyToOne(() => Menu, (menu) => menu.children, { nullable: true })
  @JoinColumn({ name: 'parentId' })
  parent: Menu | null;

  @OneToMany(() => Menu, (menu) => menu.parent)
  children: Menu[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
