import {
  IsEmail,
  IsMobilePhone,
  IsNotEmpty,
  IsOptional,
  IsStrongPassword,
  Length,
  Matches,
} from 'class-validator'

export class RegisterDto {
  @IsEmail(undefined, { message: '邮箱格式不正确' })
  email: string

  @IsNotEmpty({ message: '验证码不能为空' })
  @Length(6, 6, { message: '验证码长度必须为 6 位' })
  @Matches(/^\d{6}$/, { message: '验证码格式不正确' })
  captcha: string

  @IsOptional()
  @IsMobilePhone('zh-CN', undefined, { message: '请输入正确的手机号' })
  phone: string

  @IsOptional()
  @Length(1, 20, { message: '用户名长度必须在 1-20 位之间' })
  username: string

  @IsOptional()
  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 0,
    },
    { message: '密码必须包含大小写字母和数字' },
  )
  password: string

  head_picture: string
}

