import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable, from, of } from 'rxjs';
import { CreateUserDto } from 'src/user/models/dtos/user.dto';
const bcrypt = require('bcrypt');
import { User }  from '../user/models/user-interface';

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService){}

//   generateJWT(user :CreateUserDto) : Observable<string>{
//     return from(this.jwtService.signAsync({user}))
//   }

//   hashPassword(passport:string): Observable<String>{
//      return from<string>(bcrypt.hash(passport ,12))
//   }


//   comparePassword(password: string, passwortHash: string): Observable<any>{
//     return from(bcrypt.compare(password, passwortHash));
// }

// hashPassword(password: string): Observable <string> {
//   try{
//     return from<string>(bcrypt.hashSync(password, 12));

//   }
// catch(err){
//   console.error(err);
// }
// }




generateJWT(user: User): Observable <string> {
  return from(this.jwtService.signAsync({user}));
}

hashPassword(password: string): Observable <string> {
    return from<string>(bcrypt.hash(password, 12));
}

comparePassword(newPassword: string, passwortHash: string): Observable<any>{
  return of<any | boolean>(bcrypt.compare(newPassword, passwortHash));
}

}
