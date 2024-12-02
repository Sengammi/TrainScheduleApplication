import { SubmitHandler, UseFormSetValue } from "react-hook-form";
import { ITrainEditInput } from "@/components/screens/admin/train/train-edit.interface";
import { useRouter } from "next/router";
import { useMutation, useQuery } from "react-query";
import { TrainService } from "@/services/train.service";
import { getKeys } from "@/utils/getKeys";
import { toastError } from "@/utils/toast-error";
import { toastr } from "react-redux-toastr";
import { getAdminUrl } from "@/config/url.config";


export const useTrainEdit = (setValue: UseFormSetValue<ITrainEditInput>) => {
	const {push, query} = useRouter()
	const trainId = String(query.id)
	
	const { isLoading } = useQuery(['train', trainId], () => TrainService.getById(trainId), {
		onSuccess: ({ data }) => {
			getKeys(data).forEach(() => {
				setValue('number', data.number)
				setValue('name', data.name)

			})
		},
		
		onError: (error) => {
			toastError(error, 'Get train')
		},
		enabled: !!query.id
	})
	
	const { mutateAsync: createAsync } = useMutation('create train', (data: ITrainEditInput) => TrainService.create(data),
		{
			onSuccess: () => {
				toastr.success('Create train', 'Train create successfully')
				push(getAdminUrl(`/trains`))
			},
			
			onError: (error: any) => {
				toastError(error, 'Create train failed')
			},
		}
	)
	
	const { mutateAsync } = useMutation('update train', (data: ITrainEditInput) => TrainService.update(trainId, data),{
		onSuccess: () => {
			toastr.success('Update train','Train updated successfully')
			push(getAdminUrl('trains'))
		},
		
		onError: (error) => {
			toastError(error, 'Update train')
		}
	})
	
	const onSubmitUpdate: SubmitHandler<ITrainEditInput> = async (data) => {
		await mutateAsync(data)
	}
	
	const onSubmitCreate: SubmitHandler<ITrainEditInput> = async (data) => {
		await createAsync(data)
	}
	
	return { onSubmitCreate, onSubmitUpdate, isLoading }
}