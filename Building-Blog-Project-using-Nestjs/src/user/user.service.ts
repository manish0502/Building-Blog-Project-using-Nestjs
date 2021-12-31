import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRepository } from './user.repository';
import { UserEntity } from './models/user.entity';
import { CreateUserDto } from './models/dtos/user.dto';
import { Observable, from, throwError, observable } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { User, UserRole } from './models/user-interface';
import { AuthService } from 'src/auth/auth.service';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private readonly userRepo: UserRepository,
    private authservice: AuthService,
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
        //newUser.role = user.role;
        newUser.role = UserRole.USER;


        return from(this.userRepo.save(newUser)).pipe(
          map((user: CreateUserDto) => {
            const { password, ...result } = user;
            return result;
          }),
          catchError((err) => throwError(err)),
        );
      }),
    );
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

  findOne(id: number): Observable<CreateUserDto> {
    return from(this.userRepo.findOne(id)).pipe(
      map((user: CreateUserDto) => {
        const { password, ...result } = user;
        return result;
      }),
      catchError((err) => throwError(err.message)),
    );
  }

  // ---old findAll method -------
  // findAll(): Observable<CreateUserDto[]> {
  //   return from(this.userRepo.find({}))
  // }

  findAll(): Observable<CreateUserDto[]> {
    return from(this.userRepo.find({})).pipe(
      map((user: CreateUserDto[]) => {
        user.forEach((v) => {
          delete v.password;
        });
        return user;
      }),
    );
  }

  

  paginate(options: IPaginationOptions):Observable<Pagination<CreateUserDto>>{
    return from(paginate<CreateUserDto>(this.userRepo ,options)).pipe(
      map((usersPageable: Pagination<CreateUserDto>)=>{
        usersPageable.items.forEach(function (v) {delete v.password});
        return usersPageable;
      })
    )
  }


//   paginate(options: IPaginationOptions): Observable<Pagination<CreateUserDto>> {
//     return from(paginate<User>(this.userRepo, options)).pipe(
//         map((usersPageable: Pagination<CreateUserDto>) => {
//             usersPageable.items.forEach(function (v) {delete v.password});
//             return usersPageable;
//         })
//     )
// }


  updateOne(id: number, user: CreateUserDto): Observable<any> {
    // we do not want someone to change my email and password

    delete user.email;
    delete user.password;
    delete user.role;
    
    return from(this.userRepo.update(id, user)).pipe(
      switchMap(() => this.findOne(id)),
    );
  }

  // --- here we are returning string because it will return the JWT Token

 
 

  login(user: CreateUserDto): Observable<string> {
    return this.validateUser(user.email, user.password).pipe(
      switchMap((user: CreateUserDto) => {
        if (user) {
          return this.authservice
            .generateJWT(user)
            .pipe(map((jwt: string) => jwt));
        } else {
          return 'Wrong Credentials';
        }
      }),
    );
  }



  validateUser(email: string, password: string): Observable<CreateUserDto> {
    return from(this.userRepo.findOne({ email })).pipe(
      switchMap((user: CreateUserDto) =>
        this.authservice.comparePassword(password, user.password).pipe(
          map((match: boolean) => {
            if (match) {
              const { password, ...result } = user;
              return result;
            } else {
              throw Error;
            }
          }),
        ),
      ),
    );
  }

  findUserByMail(email: string): Observable<CreateUserDto> {
    return from(this.userRepo.findOne({ email }));
  }

  deleteOne(id: number): Observable<any> {
    return from(this.userRepo.delete(id));
  }
  updateRoleOfUser(id: number, user: CreateUserDto): Observable<any> {
    return from(this.userRepo.update(id, user));
}




}
