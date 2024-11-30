import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Patch,
	Post,
	Query,
	UsePipes,
	ValidationPipe
} from '@nestjs/common';
import { TrainService } from "./train.service";
import { ApiTags } from "@nestjs/swagger";
import { Auth } from "../auth/decorators/auth.decorator";
import { IdValidationPipe } from "../pipes/id.validation.pipe";
import { CreateTrainDto } from "./dto/create-train.dto";

@ApiTags('trains')
@Controller('trains')
export class TrainController {
	constructor(private readonly trainService: TrainService) {}
	
	@Get()
	@HttpCode(200)
	async getAll(@Query('searchParam') searchParam?: string, @Query('sortParam') sortParam?: string){
		return await this.trainService.getAll(searchParam, sortParam);
	}
	
	@Get('by-name/:name')
	@HttpCode(200)
	async getByName(@Param('name') name: string){
		return await this.trainService.byName(name);
	}
	
	@Get('by-number/:number')
	@HttpCode(200)
	async getByNumber(@Param('number') number: string){
		return await this.trainService.byNumber(number);
	}
	
	@UsePipes(new IdValidationPipe())
	@Get(':id')
	@Auth('admin')
	@HttpCode(200)
	async getById(@Param('id') id: string) {
		return await this.trainService.byId(id);
	}
	
	@Post()
	@Auth('admin')
	@HttpCode(200)
	async create(@Body() dto: CreateTrainDto){
		return await this.trainService.create(dto);
	}
	
	@UsePipes(new ValidationPipe())
	@Patch(':id')
	@Auth('admin')
	@HttpCode(200)
	async update(@Param('id', IdValidationPipe) id: string, @Body() dto: CreateTrainDto){
		return await this.trainService.update(id, dto);
	}
	
	@UsePipes(new IdValidationPipe())
	@Delete(':id')
	@Auth('admin')
	@HttpCode(200)
	async delete(@Param('id') id: string){
		return await this.trainService.delete(id);
	}
}
