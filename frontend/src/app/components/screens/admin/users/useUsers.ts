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

export const useUsers = () => {
	const [searchTerm, setSearchTerm] = useState('')
	
	useDebounceCallback((value) => setSearchTerm(value), 500);
	
	const queryData = useQuery(
		['user list', searchTerm],
		() => UserService.getAll(searchTerm),
		{
			select: ({ data }) => data.map((user):ITableItem => ({
				_id: user._id,
				editUrl: getAdminUrl(`user/${user._id}`),
				items: [user.email, user.username, convertMongoDate(user.createdAt), ConvertRole(user.isAdmin)]
			})),
			onError: (error: any) => {
				toastError(error, 'User list')
			},
		},
	)

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value)
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
		handleSearch, ...queryData, searchTerm, deleteAsync
	}), [queryData, searchTerm, deleteAsync]);

}