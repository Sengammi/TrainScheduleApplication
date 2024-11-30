import {prop, Ref} from "@typegoose/typegoose"
import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";

export interface UserModel extends Base {}
export class UserModel extends TimeStamps{
    @prop()
    username: string
    
    @prop({unique: true})
    email: string

    @prop()
    password: string

    @prop({default: false})
    isAdmin: boolean
}