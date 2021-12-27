import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRepository } from './user.repository';
import { UserEntity } from './models/user.entity';
import { CreateUserDto } from './models/dtos/user.dto';
import { Observable, from, throwError } from 'rxjs';
import { User } from './models/user-interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private readonly userRepo: UserRepository,
  ) {}

  //--this is with interface User
  create(userDto: User): Observable<User> {
    const user = this.userRepo.create(userDto);
    return from(this.userRepo.save(user));
  }

  //-----This is DTO file
  // create(userDto: CreateUserDto) : Observable<CreateUserDto>{
  //   const user =  this.userRepo.create(userDto);
  //   return from(this.userRepo.save(user));
  // }


  findOne(id:number):Observable<any>{
    return from(this.userRepo.findOne(id))
  }

  findAll(): Observable<User[]> {
    return from(this.userRepo.find({}));
  }


  updateOne(id:number , user:User): Observable<any> {
    return from(this.userRepo.update(id , user))
  }

  deleteOne(id: number): Observable<any> {
    return from(this.userRepo.delete(id));
  }
}
