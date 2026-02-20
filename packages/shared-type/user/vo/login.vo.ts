import { IUserInfo } from 'types/global'

export class LoginVo {
  userInfo: IUserInfo

  accessToken: string

  refreshToken: string
}
