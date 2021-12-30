import { Injectable, CanActivate, ExecutionContext ,Inject, forwardRef} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserService } from 'src/user/user.service';
import { Observable } from "rxjs";
import { hasRoles } from '../decorator/roles.decorator';
import { CreateUserDto } from 'src/user/models/dtos/user.dto';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
      private reflector: Reflector ,
      @Inject(forwardRef(() => UserService))
      private userService: UserService
    ) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    console.log(request)
    const user:CreateUserDto = request.user;

   return true
  }
}