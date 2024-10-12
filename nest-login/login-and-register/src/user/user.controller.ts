import { Controller, Post, Body, Inject, Res, ValidationPipe, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Inject(JwtService)
  private jwtService: JwtService;

  @Post('login')
  async login(@Body(ValidationPipe) user: LoginDto, @Res({ passthrough: true }) res: Response) {
    const loginRes = await this.userService.login(user)

    if (loginRes) {
      const token = await this.jwtService.signAsync({
        user: {
          id: loginRes.id,
          username: loginRes.username
        }
      })
      res.setHeader('token', token)
      return '登陆成功'
    } else {
      return '登陆失败'
    }
  }

  @Post('register')
  async register(@Body(ValidationPipe) user: RegisterDto) {
    return await this.userService.register(user)
  }

  @Get('init')
  initData(){
    this.userService.initData()
  }
}
