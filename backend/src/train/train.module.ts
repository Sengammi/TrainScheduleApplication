import { Module } from '@nestjs/common';
import { TrainController } from './train.controller';
import { TrainService } from './train.service';
import { TypegooseModule } from "nestjs-typegoose";
import { ConfigModule } from "@nestjs/config";
import { TrainModel } from "./train.model";

@Module({
  imports: [
     TypegooseModule.forFeature([
        {
          typegooseClass: TrainModel,
          schemaOptions: {
            collection: "Train"
          }
        }
     ]),
  ],
  controllers: [TrainController],
  providers: [TrainService]
})
export class TrainModule {}
