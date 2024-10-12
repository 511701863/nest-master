import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class LoginGuard implements CanActivate {
  @Inject(JwtService)
  private jwtService:JwtService

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest()

    const auth = request.header('authorization') || ''

    const bearer = auth.split(' ')

    if(!bearer || bearer.length < 2){
      throw new UnauthorizedException('token错误')
    }

    const token = bearer[1]

    try{
      const info = this.jwtService.verify(token)
      request.user = info.User
      return true 
    }
    catch(e){
      throw new UnauthorizedException('token 失效，请重新登录')
    }
  }
}
