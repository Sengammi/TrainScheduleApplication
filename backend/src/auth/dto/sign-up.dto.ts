import { IsEmail, IsString, MinLength } from 'class-validator'
import { ApiProperty } from "@nestjs/swagger";

export class SignUpDto {
    @ApiProperty()
    @IsString()
    username: string
    
    @ApiProperty()
    @IsEmail()
    email: string
    
    @ApiProperty()
    @MinLength(6, {message: "Password cannot be less then 6 characters"})
    @IsString()
    password: string
}