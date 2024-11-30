import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";


export class CreateTrainDto {
	@ApiProperty()
	@IsString()
	number: string;
	
	@ApiProperty()
	@IsString()
	name: string;
}