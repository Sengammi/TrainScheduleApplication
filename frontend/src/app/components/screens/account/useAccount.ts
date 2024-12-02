import { IPassword, IUser } from "@/shared/types/user.types";
import { SubmitHandler, UseFormSetValue } from "react-hook-form";
import { useAuth } from "@/hooks/useAuth";
import { useMutation, useQuery } from "react-query";
import { UserService } from "@/services/user.service";
import { toastError } from "@/utils/toast-error";
import { toastr } from "react-redux-toastr";


export interface IAccountInput extends Pick<IUser, 'username' | 'email' |  'password'> {}

export const useAccount = (setValue: UseFormSetValue<IAccountInput>) => {
	const { user } = useAuth();
	
	const { isLoading } = useQuery('account', () => UserService.getAccount(), {
		onSuccess: ({data}) => {
			setValue('username', data.username);
			setValue('email', data.email);
		},
		onError: (error) => {
			toastError(error, 'Get account');
		},
		enabled: !!user,
	})
	
	const { mutateAsync } = useMutation('update account', (data: IAccountInput) => UserService.updateAccount(data), {
		onSuccess: () => {
			toastr.success('Updated account', 'update was successful');
		},
		onError: (error) => {
			toastError(error, 'Update account')
		}
	})
	
	const { mutateAsync: changePassword } = useMutation('Change password', (data: IPassword) => UserService.changePassword(data), {
		onSuccess: () => {
			toastr.success('Change password', 'update was successful');
		},
		onError: (error) => {
			toastError(error, 'Change password')
		}
	})
	
	const onSubmit: SubmitHandler<IAccountInput> = async (data: IAccountInput) => {
		await mutateAsync(data)
	}
	
	const onChangePassword: SubmitHandler<IPassword> = async (data: IPassword) => {
		await changePassword(data)
	}
	
	return { onSubmit, onChangePassword, isLoading }
}