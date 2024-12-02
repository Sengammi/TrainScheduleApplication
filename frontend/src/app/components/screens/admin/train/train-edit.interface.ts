import { ITrain } from "@/shared/types/schedule.types";


export interface ITrainEditInput extends Omit<ITrain, '_id'> {}