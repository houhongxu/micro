import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Menu } from './entities/menu.entity';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';

@Injectable()
export class MenuService {
  private readonly logger: Logger;

  constructor(
    @InjectRepository(Menu)
    private readonly menuRepository: Repository<Menu>,
  ) {
    this.logger = new Logger(MenuService.name);
  }

  async findAll(): Promise<Menu[]> {
    const allMenus = await this.menuRepository.find({
      relations: ['children'],
      order: { id: 'ASC' },
    });

    const menuMap = new Map<number, Menu>();
    const rootMenus: Menu[] = [];

    allMenus.forEach((menu) => {
      menuMap.set(menu.id, { ...menu, children: [] });
    });

    allMenus.forEach((menu) => {
      const menuWithChildren = menuMap.get(menu.id)!;
      if (menu.parentId != null) {
        const parent = menuMap.get(menu.parentId);
        if (parent) {
          if (!parent.children) parent.children = [];
          parent.children.push(menuWithChildren);
        }
      } else {
        rootMenus.push(menuWithChildren);
      }
    });

    return rootMenus;
  }

  async findOne(id: number): Promise<Menu> {
    const menu = await this.menuRepository.findOne({
      where: { id },
      relations: ['parent', 'children'],
    });

    if (!menu) {
      throw new NotFoundException('菜单不存在');
    }

    return menu;
  }

  async create(createMenuDto: CreateMenuDto): Promise<Menu> {
    if (createMenuDto.parentId != null) {
      const parent = await this.menuRepository.findOne({
        where: { id: createMenuDto.parentId },
      });
      if (!parent) {
        throw new NotFoundException('父菜单不存在');
      }
    }

    const menu = this.menuRepository.create({
      name: createMenuDto.name,
      path: createMenuDto.path,
      icon: createMenuDto.icon,
      parentId: createMenuDto.parentId ?? null,
    });

    return await this.menuRepository.save(menu);
  }

  async update(id: number, updateMenuDto: UpdateMenuDto): Promise<Menu> {
    const menu = await this.findOne(id);

    if (updateMenuDto.parentId !== undefined) {
      if (updateMenuDto.parentId === id) {
        throw new BadRequestException('不能将自己设为父菜单');
      }
      if (updateMenuDto.parentId != null) {
        const parent = await this.menuRepository.findOne({
          where: { id: updateMenuDto.parentId },
        });
        if (!parent) {
          throw new NotFoundException('父菜单不存在');
        }
      }
      menu.parentId = updateMenuDto.parentId ?? null;
    }

    if (updateMenuDto.name !== undefined) menu.name = updateMenuDto.name;
    if (updateMenuDto.path !== undefined) menu.path = updateMenuDto.path;
    if (updateMenuDto.icon !== undefined) menu.icon = updateMenuDto.icon;

    return await this.menuRepository.save(menu);
  }

  async remove(id: number): Promise<void> {
    const menu = await this.findOne(id);

    const children = await this.menuRepository.find({
      where: { parentId: id },
    });
    if (children.length > 0) {
      throw new BadRequestException('存在子菜单，无法删除');
    }

    await this.menuRepository.softRemove(menu);
  }
}
