import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable, from, of } from 'rxjs';
const bcrypt = require('bcrypt');
import { User }  from '../user/models/user-interface';

export class AuthService {
    constructor(private readonly jwtService: JwtService){}

  generateJWT(user :User) : Observable<string>{
    return from(this.jwtService.signAsync({user}))
  }

  hashPassword(passport:string): Observable<String>{
     return 
  }


  comparePassword(): Observable<any>{
    return 
  }

}
