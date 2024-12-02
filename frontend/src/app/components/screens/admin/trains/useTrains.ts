import { ChangeEvent, useMemo, useState } from "react";
import { useDebounceCallback } from "usehooks-ts";
import { useMutation, useQuery } from "react-query";
import { UserService } from "@/services/user.service";
import { ITableItem } from "@/app/components/ui/admin-table/AdminTable/admin-table.interface";
import { getAdminUrl } from "@/config/url.config";
import { convertMongoDate } from "@/utils/convert-mongo-date";
import { toastError } from "@/utils/toast-error";
import { toastr } from "react-redux-toastr";
import { ConvertRole } from "@/utils/convert-role";
import { useRouter } from "next/router";
import { TrainService } from "@/services/train.service";

export const useTrains = () => {
	const [searchTerm, setSearchTerm] = useState('')
	const {push} = useRouter()
	
	const debouncedTerm = useDebounceCallback((value) => setSearchTerm(value), 500);
	
	
	const queryData = useQuery(
		['user list', searchTerm],
		() => TrainService.getAll(searchTerm),
		{
			select: ({ data }) => data.map((train):ITableItem => ({
				_id: train._id,
				editUrl: getAdminUrl(`train/edit/${train._id}`),
				items: [train.number, train.name]
			})),
			onError: (error: any) => {
				toastError(error, 'Train list')
			},
		},
	)

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value)
	}

	const createAsync = () => {
		push(getAdminUrl(`/train/create/`))
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
		handleSearch, ...queryData, searchTerm, deleteAsync, createAsync
	}), [queryData, searchTerm, deleteAsync, createAsync]);

}