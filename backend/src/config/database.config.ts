import {ConfigService} from "@nestjs/config";
import {TypegooseModuleOptions} from "nestjs-typegoose";

export const getMongoDbConfig = async (ConfigService: ConfigService): Promise<TypegooseModuleOptions> => ({
	uri: "mongodb+srv://" + ConfigService.get('MONGO_USERNAME') + ":" + ConfigService.get('MONGO_PASSWORD') + ConfigService.get('MONGO_URI')
})