import { IsEmail, IsNotEmpty } from 'class-validator'

export class LoginDto {
  @IsNotEmpty({
    message: '邮箱不能为空',
  })
  @IsEmail(undefined, { message: '邮箱格式不正确' })
  email: string

  @IsNotEmpty({
    message: '密码不能为空',
  })
  password: string
}

