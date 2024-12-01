import { FC } from 'react'
import { useAuthRedirect } from "@/app/components/screens/auth/useAuthRedirect";
import { useAuth } from "@/hooks/useAuth";
import { useActions } from "@/hooks/useActions";
import { SubmitHandler, useForm } from "react-hook-form";
import { ISignUpInput } from "@/app/components/screens/auth/auth.interface";
import { Meta } from "@/app/meta/Meta";
import { Heading } from "@/app/components/ui/heading/Heading";

import styles from './Auth.module.scss'

export const SignUp: FC = () => {
	useAuthRedirect()
	
	const { isLoading, user } = useAuth()
	const { signUp } = useActions()
	
	const {
		register: registerInput,
		handleSubmit,
		formState,
		reset,
	} = useForm<ISignUpInput>({
		mode: 'onChange',
	})
	
	const handlerSignUp: SubmitHandler<ISignUpInput> = async (data) => {
		signUp(data)
	}
	
	return (
		<Meta title={'Sign Up'}>
			<section className={styles.wrapper}>
				<form onSubmit={handleSubmit(handlerSignUp)}>
					<Heading title={'Sign up'} className={'mb-6'} />
					
					
				</form>
			</section>
		</Meta>
	)
}
