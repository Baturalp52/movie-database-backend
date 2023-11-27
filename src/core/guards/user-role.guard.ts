import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '../enums/user-role.enum';

@Injectable()
export class UserRoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const role: UserRole = this.reflector.get<UserRole>(
      'role',
      context.getHandler(),
    );
    if (!role) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user: any = request.user;
    const hasRole = () => {
      return role <= user?.role;
    };

    return user && hasRole();
  }
}
