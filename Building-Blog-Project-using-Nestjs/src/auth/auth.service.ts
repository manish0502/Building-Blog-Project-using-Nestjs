import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable, from, of } from 'rxjs';
import { CreateUserDto } from 'src/user/models/dtos/user.dto';
const bcrypt = require('bcrypt');
import { User }  from '../user/models/user-interface';

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService){}

  generateJWT(user :CreateUserDto) : Observable<string>{
    return from(this.jwtService.signAsync({user}))
  }

  hashPassword(passport:string): Observable<String>{
     return from<string>(bcrypt.hash(passport ,12))
  }


  comparePassword(newPassword:string , hashPassword:string): Observable<any | boolean>{
    return from(<any | boolean>bcrypt.comparePassword(newPassword ,hashPassword));
  }

}
