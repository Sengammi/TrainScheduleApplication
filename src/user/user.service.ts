import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from "nestjs-typegoose";
import { UserModel } from "./user.model";
import { ModelType } from "@typegoose/typegoose/lib/types";
import { genSalt, hash } from "bcryptjs";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UserService {
	constructor(@InjectModel(UserModel) private readonly UserModel: ModelType<UserModel>) {}
	
	async byId(_id: string) {
		const user = await this.UserModel.findById(_id);
		
		if (!user) {
			throw new NotFoundException('User not found')
		}
		
		return user;
	}
	
	async byUsername(username: string) {
		const user = await this.UserModel.findOne({ username: username });
		
		if (!user) {
			throw new NotFoundException('User not found')
		}
		
		return user;
	}
	
	async updateProfile(_id: string, dto: UpdateUserDto) {
		const user = await this.byId(_id);
		const isSameUser = await this.UserModel.findOne({email: dto.email})
		
		if (isSameUser && isSameUser._id.toString()!== _id.toString()){
			throw new NotFoundException("Email already is used")
		}
		
		user.username = dto.username
		user.email = dto.email
		
		if (dto.isAdmin || dto.isAdmin === false) {
			user.isAdmin = dto.isAdmin;
		}
		
		await user.save()
		return user
	}
	
	async changePassword(_id: string, dto: UpdateUserDto) {
		const user = await this.byId(_id)
		
		if (dto.password) {
			const salt = await genSalt(10);
			user.password = await hash(dto.password, salt)
			
			await user.save()
			return user
		}
	}
	
	async getCount() {
		return this.UserModel.find().count().exec()
	}
	
	
	async getAll(searchParam?: string) {
		let options = {};
		
		if (searchParam){
			options = {
				$or: [
					{
						username: new RegExp(searchParam, 'i'),
					},
					{
						email: new RegExp(searchParam, 'i'),
					},
				],
			}
		}
		
		return await this.UserModel.find(options)
							  .select('-password -updaterAt -__v')
							  .sort({username: -1})
							  .exec()
	}
	
	async delete(_id: string) {
		return this.UserModel.findByIdAndDelete(_id).exec();
	}
}
