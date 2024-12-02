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

export const useUsers = () => {
	const [searchTerm, setSearchTerm] = useState('')
	
	const debouncedTerm = useDebounceCallback((value) => setSearchTerm(value), 500);
	
	
	const queryData = useQuery(
		['user list', searchTerm],
		() => UserService.getAll(searchTerm),
		{
			select: ({ data }) => data.map((user):ITableItem => ({
				_id: user._id,
				editUrl: getAdminUrl(`user/edit/${user._id}`),
				items: [user.email, user.username, convertMongoDate(user.createdAt), ConvertRole(user.isAdmin)]
			})),
			onError: (error: any) => {
				toastError(error, 'User list')
			},
			// enabled: !!searchTerm,
		},
	)

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value)
	}

	// const { mutateAsync: createAsync } = useMutation(
	// 	'create user',
	// 	() => UserService.create(),
	// 	{
	// 		onError: (error: any) => {
	// 			toastError(error, 'Create user failed')
	// 		},
	// 		onSuccess: ({ data: _id }) => {
	// 			toastr.success('Create user', 'create was successful')
	// 			push(getAdminUrl(`/user/edit/${_id}`))
	// 		},
	// 	}
	// )

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
		handleSearch, ...queryData, searchTerm, deleteAsync
	}), [queryData, searchTerm, deleteAsync]);

}