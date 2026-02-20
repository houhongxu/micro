import {
  createParamDecorator,
  ExecutionContext,
  SetMetadata,
} from '@nestjs/common';
import { Request } from 'express';
import { REQUIRE_LOGIN, REQUIRE_PERMISSION } from './constants/global';
import { PermissionValue } from './constants/permissions';
import { IUserInfo } from 'shared-type';

export const RequireLogin = () => SetMetadata(REQUIRE_LOGIN, true);

export const RequirePermission = (...permissions: PermissionValue[]) =>
  SetMetadata(REQUIRE_PERMISSION, permissions);

export const UserInfo = createParamDecorator(
  (key: keyof IUserInfo, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest();

    const userInfo = request.userInfo;

    const result = key ? userInfo![key] : userInfo;

    return result;
  },
);
