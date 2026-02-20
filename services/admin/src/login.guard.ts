import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Logger } from '@nestjs/common';
import { Request } from 'express';
import { REQUIRE_LOGIN } from './constants/global';
import { IUserInfo } from 'shared-type';

@Injectable()
export class LoginGuard implements CanActivate {
  private readonly logger: Logger;

  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {
    this.logger = new Logger(LoginGuard.name);
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    const requireLogin = this.reflector.getAllAndOverride<boolean>(
      REQUIRE_LOGIN,
      [
        context.getClass(), // 先检查类装饰器
        context.getHandler(), // 再检查方法装饰器
      ],
    );

    if (!requireLogin) {
      return true;
    }

    const authorization = request.headers.authorization;

    if (!authorization) {
      throw new UnauthorizedException('用户未登录');
    }

    try {
      const token: string = authorization.split(' ')[1];
      const userInfo = this.jwtService.verify<Partial<IUserInfo>>(token);

      request.userInfo = userInfo;

      return true;
    } catch (error) {
      this.logger.error(error);

      throw new UnauthorizedException('登录已失效，请重新登录');
    }
  }
}
