import { SubmitHandler, UseFormSetValue } from "react-hook-form";
import { IRouteEditInput } from "@/components/screens/admin/route/route-edit.interface";
import { useRouter } from "next/router";
import { useMutation, useQuery } from "react-query";
import { RouteService } from "@/services/route.service";
import { getKeys } from "@/utils/getKeys";
import { toastError } from "@/utils/toast-error";
import { toastr } from "react-redux-toastr";
import { getAdminUrl } from "@/config/url.config";

const formatDateTime = (dateString: string | any) => {
	if (!dateString) return '';
	const date = new Date(dateString);
	return date.toISOString().slice(0, 16);
};

export const useRouteEdit = (setValue: UseFormSetValue<IRouteEditInput | any>) => {
	const {push, query} = useRouter()
	const routeId = String(query.id)
	
	const { isLoading } = useQuery(['route', routeId], () => RouteService.getById(routeId), {
		onSuccess: ({ data }) => {
			getKeys(data).forEach(() => {
				setValue('train', data.train);
				setValue('from', data.from);
				setValue('to', data.to);
				setValue('departureDate',  formatDateTime(data.departureDate));
				setValue('arrivalDate', formatDateTime(data.arrivalDate));
			})
		},
		
		onError: (error) => {
			toastError(error, 'Get route')
		},
		enabled: !!query.id
	})
	
	const { mutateAsync: createAsync } = useMutation('create route', (data: IRouteEditInput) => RouteService.create(data),
		{
			onSuccess: () => {
				toastr.success('Create route', 'Train create successfully')
				push(getAdminUrl(`/routes`))
			},
			
			onError: (error: any) => {
				toastError(error, 'Create route failed')
			},
		}
	)
	
	const { mutateAsync } = useMutation('update route', (data: IRouteEditInput) => RouteService.update(routeId, data),{
		onSuccess: () => {
			toastr.success('Update route','Train updated successfully')
			push(getAdminUrl('routes'))
		},
		
		onError: (error) => {
			toastError(error, 'Update route')
		}
	})
	
	const onSubmitUpdate: SubmitHandler<IRouteEditInput> = async (data) => {
		await mutateAsync(data)
	}
	
	const onSubmitCreate: SubmitHandler<IRouteEditInput> = async (data) => {
		await createAsync(data)
	}
	
	return { onSubmitCreate, onSubmitUpdate, isLoading }
}