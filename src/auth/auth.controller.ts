import { Body, Controller, HttpCode, Post, UsePipes } from '@nestjs/common';
import { AuthService } from "./auth.service";
import { ApiTags } from "@nestjs/swagger";
import { RefreshTokenDto } from "./dto/refreshToken.dto";
import { IdValidationPipe } from "../pipes/id.validation.pipe";
import { SignUpDto } from "./dto/sign-up.dto";
import { SignInDto } from "./dto/sign-in.dto";

@ApiTags('auth')
@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}
	
	@UsePipes(new IdValidationPipe())
	@HttpCode(201)
	@Post('sign-up')
	async signUp(@Body() dto: SignUpDto){
		return await this.authService.signUp(dto);
	}
	
	@UsePipes(new IdValidationPipe())
	@HttpCode(200)
	@Post('sign-in')
	async signIn(@Body() dto: SignInDto){
		return await this.authService.signIn(dto);
	}
	
	@UsePipes(new IdValidationPipe)
	@HttpCode(200)
	@Post('sign-in/access-token')
	async getNewTokens(@Body() dto: RefreshTokenDto){
		return await this.authService.getNewTokens(dto);
	}
}
