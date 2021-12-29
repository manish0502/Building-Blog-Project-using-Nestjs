import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRepository } from './user.repository';
import { UserEntity } from './models/user.entity';
import { CreateUserDto } from './models/dtos/user.dto';
import { Observable, from, throwError } from 'rxjs';
import { switchMap, map, catchError} from 'rxjs/operators';
import { User } from './models/user-interface';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private readonly userRepo: UserRepository,
    private authservice: AuthService
  ) {}


  // -----This is Updated One --------------
  create(user: CreateUserDto): Observable<CreateUserDto> {
    return this.authservice.hashPassword(user.password).pipe(
        switchMap((passwordHash: string) => {
            const newUser = new UserEntity();
            newUser.name = user.name;
            newUser.username = user.username;
            newUser.email = user.email;
            newUser.password = passwordHash;
      

            return from(this.userRepo.save(newUser)).pipe(
                map((user: CreateUserDto) => {
                    const {password, ...result} = user;
                    return result;
                }),
                catchError(err => throwError(err))
            )
        })
    )
}


  //--this is with interface User
  // create(userDto: CreateUserDto): Observable<CreateUserDto> {
  //   const user = this.userRepo.create(userDto);
  //   return from(this.userRepo.save(user));
  // }

  //-----This is DTO file
  // create(userDto: CreateUserDto) : Observable<CreateUserDto>{
  //   const user =  this.userRepo.create(userDto);
  //   return from(this.userRepo.save(user));
  // }


  //old findone method for
  // findOne(id:number):Observable<any>{
  //       return from(this.userRepo.findOne(id))

  // }

  findOne(id:number):Observable<CreateUserDto>{
    return from(this.userRepo.findOne(id)).pipe(
      map((user:CreateUserDto)=>{
        const {password, ...result} = user;
        return result;
      }),
      catchError(err => throwError(err.message))
    )
  }

  // ---old findAll method -------
  // findAll(): Observable<CreateUserDto[]> {
  //   return from(this.userRepo.find({}))
  // }


  findAll(): Observable<CreateUserDto[]> {
    return from(this.userRepo.find({})).pipe(
      map((user:CreateUserDto[])=>{
        user.forEach((v) =>{delete v.password})
        return user;
      })
    )
  }


  updateOne(id:number , user:CreateUserDto): Observable<any> {

    // we do not want someone to change my email and password

    delete user.email;
    delete user.password;
    return from(this.userRepo.update(id , user)).pipe(
      switchMap(() => this.findOne(id))
  );
  }


  // --- here we are returning string because it will return the JWT Token
  
  login(user: User): Observable<string> {
    return
  }

  deleteOne(id: number): Observable<any> {
    return from(this.userRepo.delete(id));
  }



}
