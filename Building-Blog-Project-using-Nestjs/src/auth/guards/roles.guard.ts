import { Injectable, CanActivate, ExecutionContext ,Inject, forwardRef} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserService } from 'src/user/user.service';
import { Observable } from "rxjs";
//import { hasRoles } from '../decorator/roles.decorator';
import { CreateUserDto } from 'src/user/models/dtos/user.dto';
import { map } from "rxjs/operators";
//import { User } from 'src/user/models/user-interface';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
      private reflector: Reflector ,
      @Inject(forwardRef(() => UserService))
      private userService: UserService
    ) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>(
      'roles', 
      context.getHandler()
    );
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    console.log(request)
    const user:CreateUserDto = request.user.user;

  

   return this.userService.findOne(user.id).pipe(
     map((user:CreateUserDto) =>{
      const hasRole = () => roles.indexOf(user.role) > -1;
      let hasPermission: boolean = false;
      console.log(hasRole);
      if (hasRole()) {
        console.log('Has permision is true')
          hasPermission = true;
      };
      return user && hasPermission;
          
     })
   )
  }
}