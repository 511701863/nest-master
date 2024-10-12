import { Controller, Post, Body, Get, Session } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('login')
  async login(@Body() user: LoginDto, @Session() session) {
    const loginRes = await this.userService.login(user)

    session.user = {
      username: loginRes.username
    }

    if (loginRes) {
      return '登陆成功'
    } else {
      return '登陆失败'
    }
  }

  @Post('register')
  async register(@Body() user: RegisterDto) {
    return await this.userService.register(user)
  }

  @Get('init')
  initData() {
    this.userService.initData()
  }
}
