import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from "nestjs-typegoose";
import { TrainModel } from "./train.model";
import { ModelType } from "@typegoose/typegoose/lib/types";
import { CreateTrainDto } from "./dto/create-train.dto";

@Injectable()
export class TrainService {
	constructor(@InjectModel(TrainModel) private readonly TrainModel: ModelType<TrainModel> ) {}
	
	async byId(_id: string) {
		const train = await this.TrainModel.findById(_id).exec();
		
		if (!train){
			throw new NotFoundException("Train not found");
		}
		
		return train;
	}
	
	async byNumber(number: string) {
		const train = await this.TrainModel.findOne({ number: new RegExp(number, 'i') }).exec();
		
		if (!train){
			throw new NotFoundException("Train not found");
		}
		
		return train;
	}
	
	async byName(name: string) {
		const train = await this.TrainModel.findOne({ name: new RegExp(name, 'i') }).exec();
		
		if (!train){
			throw new NotFoundException("Train not found");
		}
		
		return train;
	}
	
	async getAll(searchParam?: string, sortParam?: string) {
		let options = {};
		let sort = '-createdAt';
		
		if (searchParam) {
			options = {
				$or: [
					{
						name: new RegExp(searchParam, 'i')
					},
					{
						number: new RegExp(searchParam, 'i')
					}
				]
			}
		}
		
		if (sortParam) {
			sort = sortParam
		}
		
		return await this.TrainModel.find(options)
							  .select('-updateAt, -__v')
							  .sort(sort)
							  .exec();
	}
	
	async create(dto: CreateTrainDto){
		const train = await this.TrainModel.find(dto).exec();
		
		if (train){
			throw new BadRequestException('Train already exists');
		}
		
		return await this.TrainModel.create(dto);
	}
	
	async update(_id: string, dto: CreateTrainDto) {
		const train =  await this.TrainModel.findByIdAndUpdate(_id, dto, {new: true}).exec();
		
		if (!train){
			throw new NotFoundException('Train not found');
		}
		
		return train;
	}
	
	async delete(_id: string) {
		const train = await this.TrainModel.findByIdAndDelete(_id)
		
		if (!train){
			throw new NotFoundException('Train not found');
		}
		
		return train;
	}
}
