import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from "nestjs-typegoose";
import { UserModel } from "../user/user.model";
import { ModelType } from "@typegoose/typegoose/lib/types";
import { JwtService } from "@nestjs/jwt";
import { RefreshTokenDto } from "./dto/refreshToken.dto";

@Injectable()
export class AuthService {
	constructor(@InjectModel(UserModel) private readonly UserModel: ModelType<UserModel>,
					private readonly jwtService: JwtService) {}
	
	async getNewTokens ({refreshToken}: RefreshTokenDto) {
		if (!refreshToken) {
			throw new UnauthorizedException('Please sing in!')
		}
		
		const result = await this.jwtService.verifyAsync(refreshToken)
		
		if (!result){
			throw new UnauthorizedException('Invalid refresh token or expired')
		}
		
		const user = await this.UserModel.findById(result._id)
		const tokens = await this.issueTokenPair(result._id)
		
		return{
			user: this.returnUserFields(user),
			...tokens,
		}
	}
	
	async issueTokenPair(userId: string) {
		const data = { _id: userId };
		
		const refreshToken = await this.jwtService.signAsync(data, {
			expiresIn: '15d'
		});
		const accessToken = await this.jwtService.signAsync(data, {
			expiresIn: '10h'
		});
		
		return {
			accessToken,
			refreshToken,
		}
	}
	
	returnUserFields(user: UserModel) {
		return{
			_id: user._id,
			username: user.username,
			email: user.email,
			isAdmin: user.isAdmin
		}
	}

}
