import { Controller ,Post ,Body ,Get ,Patch , Put , Delete ,Param ,NotFoundException} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './models/user-interface'
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { CreateUserDto } from './models/dtos/user.dto'


@Controller('users')
export class UserController {
    constructor(private userService: UserService) { }



    //----this is using interface User----------
    @Post()
    create(@Body() user: CreateUserDto): Observable<CreateUserDto | Object> {
        return this.userService.create(user).pipe(
            map((user: CreateUserDto) => user),
            catchError(err => of({ error: err.message }))
        );
    }

  // ------This is Using DTO files------------------
    // @Post()
    // create(@Body() user: CreateUserDto): Observable<CreateUserDto | Object> {
    //     return this.userService.create(user).pipe(
    //         map((user: CreateUserDto) => user),
    //         catchError(err => of({ error: err.message }))
    //     );
    // }


   @Get('/:id')
   findOne(@Param('id') id:string):Observable<CreateUserDto | Object> { 
     return this.userService.findOne(Number(id))
   
   }

    @Get()
    findAll():Observable<CreateUserDto[]>{
        return this.userService.findAll()
    }

    @Put('/:id')
    updateOne(@Param('id') id:string , @Body() user:CreateUserDto):Observable<any>{
       return this.userService.updateOne(Number(id) , user)
    }

    @Delete('/:id')
    deleteOne(@Param('id') id:string):Observable<CreateUserDto | Object>{
    return  this.userService.deleteOne(Number(id))
        
    }



  
}
