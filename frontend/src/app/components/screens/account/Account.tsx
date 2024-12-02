import { FC } from 'react'
import { useForm } from "react-hook-form";
import { Meta } from "@/app/meta/Meta";
import styles from "@/app/components/screens/auth/Auth.module.scss";
import { Heading } from "@/app/components/ui/heading/Heading";
import { Button } from "@/app/components/ui/form-elements/Button";
import { ChangePasswordFields, UpdateAccountFields } from "@/app/components/screens/account/AccountFields";
import { IPassword } from "@/shared/types/user.types";
import { IAccountInput, useAccount } from "@/app/components/screens/account/useAccount";


export const Account: FC = () => {
	
	const { handleSubmit, register, formState, setValue} = useForm<IAccountInput>({
		mode: 'onChange'
	})
	
	const { isLoading, onSubmit, onChangePassword } = useAccount(setValue)
	
	const {
		register: passwordRegisterInput,
		handleSubmit: passwordHandleSubmit,
		formState: passwordFormState,
	} = useForm<IPassword>({
		mode: 'onChange',
	})
	
	return (
		<Meta title={'Account'}>
			<section className={styles.wrapper}>
				<Heading title={'Account'} className={'mb-6'} />
				<form onSubmit={handleSubmit(onSubmit)}>
					
	
					<UpdateAccountFields
						formState={formState}
						register={register}
					/>
					
					<Button className={'!mb-5'} type={'submit'} disabled={isLoading}>Update account</Button>
					
				</form>
				<form onSubmit={passwordHandleSubmit(onChangePassword)}>
					<ChangePasswordFields
						formState={passwordFormState}
						register={passwordRegisterInput}
					/>
					
					<Button type={'submit'} disabled={isLoading}>Change password</Button>
				</form>
			</section>
		</Meta>
	)
}
