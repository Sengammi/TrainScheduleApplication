import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { prop, Ref } from "@typegoose/typegoose";
import { TrainModel } from "../train/train.model";


export interface RouteModel extends Base {}

export class RouteModel extends TimeStamps {
	@prop({ ref: () => TrainModel })
	train: Ref<TrainModel>;
	
	@prop()
	from: string;
	
	@prop()
	to: string;
	
	@prop()
	departureDate: Date;
	
	@prop()
	arrivalDate: Date;
}