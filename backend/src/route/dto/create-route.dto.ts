import { Ref } from "@typegoose/typegoose";
import { TrainModel } from "../../train/train.model";
import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDate, IsString } from "class-validator";


export class CreateRouteDto {
	@ApiProperty()
	@IsArray()
	@IsString()
	train: Ref<TrainModel>;
	
	@ApiProperty()
	@IsString()
	from: string;
	
	@ApiProperty()
	@IsString()
	to: string;
	
	@ApiProperty()
	@IsDate()
	departureDate: Date;
	
	@ApiProperty()
	@IsDate()
	arrivalDate: Date;
}