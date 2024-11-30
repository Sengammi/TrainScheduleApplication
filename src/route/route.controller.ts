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
import { RouteService } from "./route.service";
import { Auth } from "../auth/decorators/auth.decorator";
import { CreateRouteDto } from "./dto/create-route.dto";
import { IdValidationPipe } from "../pipes/id.validation.pipe";
import { ApiTags } from "@nestjs/swagger";


@ApiTags('routes')
@Controller('routes')
export class RouteController {
	constructor(private readonly routeService: RouteService) {}
	
	@Get()
	@HttpCode(200)
	async getAll(@Query('from') from?: string, @Query('to') to?: string, @Query('departureDate') departureDate?: string, @Query('sortParam') sortParam?: string){
		return await this.routeService.getAll(from, to, departureDate, sortParam);
	}
	
	@UsePipes(new IdValidationPipe())
	@Get(':id')
	@Auth('admin')
	@HttpCode(200)
	async getById(@Param('id') id: string){
		return await this.routeService.byId(id);
	}
	
	@Post()
	@Auth('admin')
	@HttpCode(201)
	async create(@Body() dto: CreateRouteDto){
		return await this.routeService.create(dto);
	}
	
	@UsePipes(new ValidationPipe())
	@Patch(':id')
	@Auth('admin')
	@HttpCode(200)
	async update(@Param('id', IdValidationPipe) id: string, @Body() dto: CreateRouteDto){
		return await this.routeService.update(id, dto);
	}
	
	@UsePipes(new IdValidationPipe())
	@Delete(':id')
	@Auth('admin')
	@HttpCode(200)
	async delete(@Param('id') id: string){
		return await this.routeService.delete(id);
	}
}
