import { useQuery } from "react-query";
import { TrainService } from "@/services/train.service";
import { IOption } from "@/ui/select/select.interface";
import { toastError } from "@/utils/toast-error";


export const useAdminTrains = () => {
	return useQuery('list of trains', () => TrainService.getAll(), {
		select: ({data}) => data.map((train): IOption => ({
			label: train.number,
			value: train._id
		})),
		
		onError: (error) => {
			toastError(error, 'Train list');
		}
	})
}