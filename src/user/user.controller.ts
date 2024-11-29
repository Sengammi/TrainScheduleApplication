import { Body, Controller, Delete, Get, HttpCode, Param, Put, Query, UsePipes } from '@nestjs/common';
import { UserService } from "./user.service";
import { ApiTags } from "@nestjs/swagger";
import { Auth } from "../auth/decorators/auth.decorator";
import { User } from "./decorators/user.decorator";
import { IdValidationPipe } from "../pipes/id.validation.pipe";
import { UpdateUserDto } from "./dto/update-user.dto";

@ApiTags('users')
@Controller('users')
export class UserController {
	constructor(private readonly userService: UserService) {}
	
	@Get('account')
	@Auth()
	async getAccount(@User("_id") _id: string) {
		return this.userService.byId(_id);
	}
	
	@UsePipes(new IdValidationPipe())
	@Put('account')
	@Auth()
	async updateAccount(@User("_id") _id: string, @Body() dto: UpdateUserDto) {
		return this.userService.updateProfile(_id, dto);
	}
	
	@Get('count')
	@Auth('admin')
	async getCountUsers(){
		return this.userService.getCount();
	}
	
	@Get()
	@Auth('admin')
	async getUsers(@Query('searchParam') searchParam?: string) {
		return await this.userService.getAll(searchParam);
	}
	
	@UsePipes(new IdValidationPipe())
	@Get('/:id')
	@Auth('admin')
	async getUserById(@Param('id') id: string) {
		return this.userService.byId(id);
	}
	
	@Get('by-username/:username')
	@Auth('admin')
	async getUserByUsername(@Param('username') username: string) {
		return this.userService.byUsername(username);
	}
	
	@UsePipes(new IdValidationPipe())
	@Put('/:id')
	@HttpCode(200)
	@Auth('admin')
	async updateUser(@Param('id') id: string, @Body() dto: UpdateUserDto) {
		return this.userService.updateProfile(id, dto);
	}
	
	@UsePipes(new IdValidationPipe())
	@Delete('/:id')
	@HttpCode(200)
	@Auth('admin')
	async deleteUser(@Param('id') id: string) {
		return this.userService.delete(id);
	}
}
