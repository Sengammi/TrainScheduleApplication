import { SubmitHandler, UseFormSetValue } from "react-hook-form";
import { IUserEditInput } from "@/components/screens/admin/user/user-edit.interface";
import { useRouter } from "next/router";
import { useMutation, useQuery } from "react-query";
import { UserService } from "@/services/user.service";
import { getKeys } from "@/utils/getKeys";
import { toastError } from "@/utils/toast-error";
import { toastr } from "react-redux-toastr";
import { getAdminUrl } from "@/config/url.config";


export const useUserEdit = (setValue: UseFormSetValue<IUserEditInput>) => {
	const {push, query} = useRouter()
	const userId = String(query.id)
	
	const { isLoading } = useQuery(['user', userId], () => UserService.getById(userId), {
		onSuccess: ({ data }) => {
			getKeys(data).forEach(() => {
				setValue('username', data.username)
				setValue('email', data.email)
				setValue('password', data.password)
				setValue('isAdmin', data.isAdmin)
			})
		},
		
		onError: (error) => {
			toastError(error, 'Get user')
		},
		enabled: !!query.id
	})
	
	const { mutateAsync } = useMutation('update user', (data: IUserEditInput) => UserService.updateById(userId, data),{
		onSuccess: () => {
			toastr.success('Update user','User updated successfully')
			push(getAdminUrl('users'))
		},
		
		onError: (error) => {
			toastError(error, 'Update user')
		}
	})
	
	const onSubmit: SubmitHandler<IUserEditInput> = async (data) => {
		await mutateAsync(data)
	}
	
	return { onSubmit, isLoading }
}