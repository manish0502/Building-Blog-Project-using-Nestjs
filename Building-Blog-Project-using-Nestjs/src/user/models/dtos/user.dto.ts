
import { IsEmail, IsString ,IsOptional } from 'class-validator';
import { User } from '../user-interface';
import { UserRole } from '../user-interface'

export class CreateUserDto implements User {

    @IsString()
    @IsOptional()
    public id?: number;

    @IsString()
    @IsOptional()
    public name?: string;

    @IsString()
    @IsOptional()
    public username?: string;

    @IsEmail()
    @IsOptional()
    public email?: string;

    @IsString()
    @IsOptional()
    password?: string;


    @IsOptional()
    role?: UserRole;


}

// export enum UserRole {
//     ADMIN = 'admin',
//     CHIEFEDITOR = 'chiefeditor',    
//     EDITOR = 'editor',
//     USER = 'user'
// }