import {
  IsEmail,
  IsMobilePhone,
  IsOptional,
  IsStrongPassword,
  Length,
} from 'class-validator'

export class UpdateDto {
  head_picture: string

  captcha: string

  @IsOptional()
  @IsEmail(undefined, {
    message: '邮箱格式不正确',
  })
  email: string

  @IsOptional()
  @Length(1, 20, { message: '用户名长度必须在 1-20 位之间' })
  username: string

  @IsOptional()
  @IsMobilePhone('zh-CN', undefined, { message: '请输入正确的手机号' })
  phone: string

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
}

