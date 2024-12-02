import { IRoute } from "@/shared/types/schedule.types";


export interface IRouteEditInput extends Omit<IRoute, '_id'> {}