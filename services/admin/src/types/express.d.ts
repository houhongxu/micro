import { Request as ExpressRequest } from 'express';
import { IUserInfo } from 'shared-type';

declare module 'express' {
  interface Request extends ExpressRequest {
    userInfo?: Partial<IUserInfo>;
  }
}
