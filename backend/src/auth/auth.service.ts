import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from "nestjs-typegoose";
import { UserModel } from "../user/user.model";
import { ModelType } from "@typegoose/typegoose/lib/types";
import { JwtService } from "@nestjs/jwt";
import { RefreshTokenDto } from "./dto/refreshToken.dto";
import { SignInDto } from "./dto/sign-in.dto";
import { compare, genSalt, hash } from 'bcryptjs';
import { SignUpDto } from "./dto/sign-up.dto";


@Injectable()
export class AuthService {
	constructor(@InjectModel(UserModel) private readonly UserModel: ModelType<UserModel>,
					private readonly jwtService: JwtService) {}
	
	async signUp(dto: SignUpDto) {
		const oldUser = await this.UserModel.findOne(dto);
		
		if (oldUser){
			throw new BadRequestException("User already exists");
		}
		
		const salt = await genSalt(10);
		const newUser = new this.UserModel({
			username: dto.username,
			email: dto.email,
			password: await hash(dto.password, salt),
		})
		await newUser.save();
		
		const tokens = await this.issueTokenPair(String(newUser._id))
		
		return {
			user: this.returnUserFields(newUser),
			...tokens
		}
	}
	
	async signIn(dto: SignInDto) {
		const user = await this.validationUser(dto);
		const tokens = await this.issueTokenPair(String(user._id));
		
		return {
			user: this.returnUserFields(user),
			...tokens
		}
	}
	
	async validationUser(dto: SignInDto): Promise<UserModel> {
		const user = await this.UserModel.findOne({ email: dto.email });
		
		if (!user){
			throw new UnauthorizedException("User not found")
		}
		
		const isValidPassword = await compare(dto.password, user.password);
		
		if (!isValidPassword){
			throw new UnauthorizedException('Invalid password')
		}
		
		return user;
	}
	
	async getNewTokens ({refreshToken}: RefreshTokenDto) {
		if (!refreshToken) {
			throw new UnauthorizedException('Please sign in!')
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
