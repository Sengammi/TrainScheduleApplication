import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class RefreshTokenDto {
    @ApiProperty()
    @IsString({message: "You did not pass refresh token of it is not a string!"})
    refreshToken: string
}