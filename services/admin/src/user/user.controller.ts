import { Controller, Post, Body, Query, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterDto, LoginDto, UpdateDto } from 'shared-type';
import { RequireLogin, UserInfo } from 'src/custom.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('用户')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return await this.userService.register(registerDto);
  }

  @Post('sendCaptcha')
  async sendCaptcha(@Query('email') email: string) {
    return await this.userService.sendCaptcha(email);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return await this.userService.login(loginDto);
  }

  @Post('refreshToken')
  async refreshToken(@Query('refreshToken') refreshToken: string) {
    return await this.userService.refreshToken(refreshToken);
  }

  @Get('findUserInfoById')
  @RequireLogin()
  async findIUserInfoById(@Query('id') id: number) {
    return await this.userService.findUserInfoById(id);
  }

  @Post('update')
  @RequireLogin()
  async update(@UserInfo('id') userId: number, @Body() updateDto: UpdateDto) {
    return await this.userService.update(userId, updateDto);
  }

  @Get('findUserInfo')
  @RequireLogin()
  async findUserInfo(@UserInfo('id') userId: number) {
    return await this.userService.findUserInfoById(userId);
  }
}
