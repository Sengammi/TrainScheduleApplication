import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { prop } from "@typegoose/typegoose";


export interface TrainModel extends Base {}

export class TrainModel extends TimeStamps {
	@prop({unique: true})
	number: string;
	
	@prop()
	name: string;
}