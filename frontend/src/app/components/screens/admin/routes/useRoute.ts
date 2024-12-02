import { ChangeEvent, useMemo, useState } from "react";
import { useDebounceCallback } from "usehooks-ts";
import { useMutation, useQuery } from "react-query";
import { UserService } from "@/services/user.service";
import { ITableItem } from "@/app/components/ui/admin-table/AdminTable/admin-table.interface";
import { getAdminUrl } from "@/config/url.config";
import { toastError } from "@/utils/toast-error";
import { toastr } from "react-redux-toastr";
import { useRouter } from "next/router";
import { RouteService } from "@/services/route.service";

export const useRoute = () => {
	const [from, setFrom] = useState('')
	const [to, setTo] = useState('');
	const [departureDate, setDepartureDate] = useState('')
	const [sortParam, setSortParam] = useState('')
	const {push} = useRouter()
	
	useDebounceCallback((value) => setFrom(value), 500);
	useDebounceCallback((value) => setTo(value), 500);
	
	const queryData = useQuery(
		['user list', from, to, departureDate, sortParam],
		() => RouteService.getAll(from, to, departureDate, sortParam),
		{
			select: ({ data }) => data.map((route):ITableItem => ({
				_id: route._id,
				editUrl: getAdminUrl(`route/edit/${route._id}`),
				items: [route.train?.number || 'N/A',
						  route.from,
						  route.to,
						  route.departureDate.toLocaleString('en-GB').replaceAll('-', ' ').replace('T', ' - ').split(':00.')[0],
						  route.arrivalDate.toLocaleString('en-GB').replaceAll('-', ' ').replace('T', ' - ').split(':00.')[0], ],
			})),
			onError: (error: any) => {
				toastError(error, 'Route list')
			},
		},
	)

	const handleFrom = (e: ChangeEvent<HTMLInputElement>) => {
		setFrom(e.target.value)
	}
	
	const handleTo = (e: ChangeEvent<HTMLInputElement>) => {
		setTo(e.target.value)
	}
	
	const handleDate = (e: ChangeEvent<HTMLInputElement>) => {
		setDepartureDate(e.target.value)
	}
	
	const handleSort = (e: ChangeEvent<HTMLInputElement>) => {
		setSortParam(e.target.id)
	}

	const createAsync = () => {
		push(getAdminUrl(`/route/create/`))
	}

	const { mutateAsync: deleteAsync } = useMutation(
		'delete user',
		(userId: string) => UserService.deleteById(userId),
		{
			onError: (error: any) => {
				toastError(error, 'Delete user failed')
			},
			onSuccess: () => {
            toastr.success('Delete user', 'delete was successful')
				queryData.refetch().then(r => r)
         }
		}
	)

	return useMemo(() => ({
		handleFrom, handleTo, handleDate, handleSort, ...queryData, from, to, departureDate, sortParam, deleteAsync, createAsync
	}), [queryData, from, to, departureDate, sortParam, deleteAsync, createAsync]);

}