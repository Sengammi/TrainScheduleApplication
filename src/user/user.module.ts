import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ConfigModule } from "@nestjs/config";
import { TypegooseModule } from "nestjs-typegoose";
import { UserModel } from "./user.model";

@Module({
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: UserModel,
        schemaOptions: {
          collection: 'User'
        }
      }
    ]),
    ConfigModule,
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
