import { CanActivate, ExecutionContext, Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { Request } from 'express';
import { UserService } from './user.service';
import { Reflector } from '@nestjs/core';
import { RedisService } from 'src/redis/redis.service';
declare module 'express-session' {
  interface Session {
    user: {
      username: string
    }
  }
}
@Injectable()
export class PermissionGuard implements CanActivate {
  @Inject(UserService)
  private userService: UserService;
  @Inject(Reflector)
  private reflector: Reflector;
  @Inject(RedisService)
  private redisService: RedisService;

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    const user = request.session.user;

    if (!user) throw new UnauthorizedException('用户未登录')

    //从redis查询用户权限数据
    let userPermission = await this.redisService.listGet(`user_${user.username}_pre`)
    console.log(userPermission,'userPermission');
    
    if (!userPermission?.length) {
      console.log('redis缓存未命中，重新请求数据库');
      const foundUser = await this.userService.findByUsername(user.username)
      userPermission = foundUser.permissions.map(item => item.name)
      this.redisService.listSet(`user_${user.username}_pre`, userPermission, 60 * 10)
    }

    //metaData 记录的权限
    const preData = this.reflector.get('permission', context.getHandler())
    if (userPermission.some(item => preData.includes(item))) {
      return true
    }
    throw new UnauthorizedException('用户无权限')
  }
}
