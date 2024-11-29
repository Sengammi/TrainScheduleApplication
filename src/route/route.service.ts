import { Injectable } from '@nestjs/common';
import { InjectModel } from "nestjs-typegoose";
import { ModelType } from "@typegoose/typegoose/lib/types";
import { RouteModel } from "./route.model";

@Injectable()
export class RouteService {
	constructor(@InjectModel(RouteModel) private readonly RouteModel: ModelType<RouteModel> ) {}
	
}
