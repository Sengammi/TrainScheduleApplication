import { FC } from 'react'
import { useForm } from "react-hook-form";
import { IUserEditInput } from "@/components/screens/admin/user/user-edit.interface";
import { useUserEdit } from "@/components/screens/admin/user/useUserEdit";
import { Meta } from "@/app/meta/Meta";
import { Heading } from "@/ui/heading/Heading";
import { SkeletonLoader } from "@/ui/SkeletonLoader";
import {
	ChangePasswordFields,
	ChangeRoleFields,
	UpdateAccountFields
} from "@/components/screens/account/AccountFields";
import { Button } from "@/ui/form-elements/Button";

export const UserEdit: FC = () => {
	const {
		handleSubmit,
		register,
		formState,
		setValue,
	} = useForm<IUserEditInput>({mode: 'onChange'})
	
	const { isLoading, onSubmit } = useUserEdit(setValue)
	
	return (
		<Meta title={'Edit user'}>
			<Heading title={'Edit user'} />
			<form onSubmit={handleSubmit(onSubmit)} className={'w-1/2 flex flex-col min-w-96 mx-auto gap-y-3 mt-10'}>
				{isLoading ? (
					<>
						<SkeletonLoader count={4} className={'h-10 mb-4'}/>
						<SkeletonLoader count={1} className={'h-10 mt-1'}/>
					</>
				) : (
					<>
						<UpdateAccountFields formState={formState} register={register}/>
						<ChangePasswordFields formState={formState} register={register}/>
						<ChangeRoleFields formState={formState} register={register}/>
						
						<Button className={''} type={"submit"}>Update user data</Button>
					</>
				)}
			</form>
		</Meta>
	)
}
