import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from "nestjs-typegoose";
import { ModelType } from "@typegoose/typegoose/lib/types";
import { RouteModel } from "./route.model";
import { CreateRouteDto } from "./dto/create-route.dto";

@Injectable()
export class RouteService {
	constructor(@InjectModel(RouteModel) private readonly RouteModel: ModelType<RouteModel> ) {}
	
	async byId(_id: string) {
		const route = await this.RouteModel.findById(_id).exec();
		
		if (!route) {
			throw new NotFoundException('Route not found');
		}
		
		return route;
	}
	
	async getAll(from?: string, to?: string, departureDate?: string, sortParam?: string) {
		let options = {};
		let sort = '-departureDate';
		
		let filters = [];
		if (from) {
			filters.push({ from: new RegExp(from, 'i') });
		}
		if (to) {
			filters.push({ to: new RegExp(to, 'i') });
		}
		if (departureDate) {
			const date = new Date(departureDate);
			const nextDay = new Date(date);
			nextDay.setDate(date.getDate() + 1);
			
			filters.push({
				departureDate: {
					$gte: date,
					$lt: nextDay
				}
			});
		}
		
		if (filters.length > 0) {
			options = {
				$and: filters
			}
		}
		
		if (sortParam) {
			sort = sortParam
		}
		
		return await this.RouteModel.find(options)
							  .select('-createdAt -updatedAt -__v')
							  .sort(sort)
							  .exec();
	}
	
	async create(dto: CreateRouteDto) {
		return await this.RouteModel.create(dto);
	}
	
	async update(_id: string, dto: CreateRouteDto) {
		const route = await this.RouteModel.findByIdAndUpdate(_id, dto, {new: true}).exec();
		
		if (!route) {
			throw new NotFoundException('Route not found');
		}
		
		return route;
	}
	
	async delete(_id: string) {
		const route = await this.RouteModel.findByIdAndDelete(_id).exec();
		
		if (!route) {
			throw new NotFoundException('Route not found');
		}
		
		return route;
	}
}
