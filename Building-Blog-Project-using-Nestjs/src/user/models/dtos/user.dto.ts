
import { IsEmail, IsString ,IsOptional } from 'class-validator';

export class CreateUserDto {

    @IsString()
    @IsOptional()
    public name: string;

    @IsString()
    @IsOptional()
    public username: string;

    @IsEmail()
    @IsOptional()
    public email: string;

    @IsString()
    @IsOptional()
    password: string;


}