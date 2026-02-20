import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterDto } from 'shared-type';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { RedisService } from 'src/redis/redis.service';
import { md5, Omit } from 'src/utils';
import { EmailService } from 'src/email/email.service';
import { LoginDto, UpdateDto } from 'shared-type';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { LoginVo, IUserInfo, RefreshTokenVo, UserInfoVo } from 'shared-type';

const CAPTCHA_TTL = 5 * 60;

const getUserInfo = (user: User) => {
  const userInfo: IUserInfo = {
    ...Omit(user, ['password', 'createdAt', 'deletedAt', 'updatedAt']),
    roles: user.roles.map((role) => role.name),
    permissions: user.roles.flatMap((role) =>
      role.permissions.map((permission) => permission.code),
    ),
  };

  return userInfo;
};

@Injectable()
export class UserService {
  private readonly logger: Logger;

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly redisService: RedisService,
    private readonly emailService: EmailService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.logger = new Logger(UserService.name);
  }

  async register(registerDto: RegisterDto) {
    const captcha = await this.redisService.get(registerDto.email);

    if (!captcha) {
      throw new NotFoundException('验证码已失效');
    }

    if (registerDto.captcha !== captcha) {
      throw new BadRequestException('验证码错误');
    }

    const oldUser = await this.userRepository.findOne({
      where: {
        email: registerDto.email,
      },
    });

    if (oldUser) {
      throw new BadRequestException('用户已存在');
    }

    try {
      const newUser = this.userRepository.create({
        ...registerDto,
        password: md5(registerDto.password),
      });

      await this.userRepository.save(newUser);

      return '注册成功';
    } catch (error) {
      this.logger.error(error);

      return '注册失败';
    }
  }

  async sendCaptcha(email: string) {
    try {
      const captcha = Math.random().toString().slice(2, 8);

      await this.redisService.set(email, captcha, CAPTCHA_TTL);

      await this.emailService.sendEmail(
        email,
        '验证码',
        `<p>你的验证码是 ${captcha}</p>`,
      );

      return '发送成功';
    } catch (error) {
      this.logger.error(error);

      return '发送失败';
    }
  }

  async login(loginDto: LoginDto) {
    const user = await this.userRepository.findOne({
      where: {
        email: loginDto.email,
      },
      relations: ['roles', 'roles.permissions'],
    });

    if (!user) {
      throw new NotFoundException('用户不存在');
    }

    if (user.password !== md5(loginDto.password)) {
      throw new BadRequestException('密码错误');
    }

    const vo = new LoginVo();

    const userInfo = getUserInfo(user);

    vo.userInfo = userInfo;

    vo.accessToken = this.jwtService.sign<Partial<IUserInfo>>(userInfo, {
      expiresIn: this.configService.get('JWT_ACCESS_TOKEN_EXPIRES_IN'),
    });

    vo.refreshToken = this.jwtService.sign<Partial<IUserInfo>>(userInfo, {
      expiresIn: this.configService.get('JWT_REFRESH_TOKEN_EXPIRES_IN'),
    });

    return vo;
  }

  async findUserInfoById(id: number) {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
      relations: ['roles', 'roles.permissions'],
    });

    if (!user) {
      throw new NotFoundException('用户不存在');
    }

    const vo = new UserInfoVo();

    const userInfo = getUserInfo(user);

    return Object.assign(vo, userInfo);
  }

  async refreshToken(refreshToken: string) {
    try {
      const oldUserInfo: Partial<IUserInfo> =
        this.jwtService.verify(refreshToken);

      if (!oldUserInfo || !oldUserInfo.id) {
        throw new UnauthorizedException('登录已失效，请重新登录');
      }

      const newUserInfo = await this.findUserInfoById(oldUserInfo.id);

      const newAccessToken = this.jwtService.sign<Partial<IUserInfo>>(
        newUserInfo,
        {
          expiresIn: this.configService.get('JWT_ACCESS_TOKEN_EXPIRES_IN'),
        },
      );

      const newRefreshToken = this.jwtService.sign<Partial<IUserInfo>>(
        newUserInfo,
        {
          expiresIn: this.configService.get('JWT_REFRESH_TOKEN_EXPIRES_IN'),
        },
      );

      const vo = new RefreshTokenVo();

      vo.accessToken = newAccessToken;
      vo.refreshToken = newRefreshToken;

      return vo;
    } catch (error) {
      this.logger.error(error);

      throw new UnauthorizedException('登录已失效，请重新登录');
    }
  }

  async update(userId: number, updateDto: UpdateDto) {
    if (updateDto.email) {
      const captcha = await this.redisService.get(updateDto.email);

      if (!captcha) {
        throw new NotFoundException('验证码已失效');
      }

      if (updateDto.captcha !== captcha) {
        throw new BadRequestException('验证码错误');
      }
    }

    if (updateDto.phone) {
      console.log('验证手机号');
    }

    const oldUser = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });

    if (!oldUser) {
      throw new NotFoundException('用户不存在');
    }

    const newUser = this.userRepository.create({
      ...oldUser,
      ...updateDto,
    });

    try {
      await this.userRepository.save(newUser);

      return '更新成功';
    } catch (error) {
      this.logger.error(error);

      return '更新失败';
    }
  }
}
