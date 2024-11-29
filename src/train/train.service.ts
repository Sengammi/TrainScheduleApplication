import { Injectable } from '@nestjs/common';
import { InjectModel } from "nestjs-typegoose";
import { TrainModel } from "./train.model";
import { ModelType } from "@typegoose/typegoose/lib/types";

@Injectable()
export class TrainService {
	constructor(@InjectModel(TrainModel) private readonly TrainModel: ModelType<TrainModel> ) {}
	
	
}
