import { Module } from '@nestjs/common';
import { RouteService } from './route.service';
import { RouteController } from './route.controller';
import { TypegooseModule } from "nestjs-typegoose";
import { RouteModel } from "./route.model";

@Module({
  imports: [
     TypegooseModule.forFeature([
       {
         typegooseClass: RouteModel,
         schemaOptions: {
           collection: 'route'
         }
       }
     ])
  ],
  providers: [RouteService],
  controllers: [RouteController]
})
export class RouteModule {}
