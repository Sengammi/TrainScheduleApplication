import { FC } from 'react'
import { useAuthRedirect } from "@/app/components/screens/auth/useAuthRedirect";
import { useAuth } from "@/hooks/useAuth";
import { useActions } from "@/hooks/useActions";
import { SubmitHandler, useForm } from "react-hook-form";
import { ISignInInput } from "@/app/components/screens/auth/auth.interface";
import { Meta } from "@/app/meta/Meta";
import styles from "@/app/components/screens/auth/Auth.module.scss";
import { Heading } from "@/app/components/ui/heading/Heading";
import { SignInFields } from "@/app/components/screens/auth/AuthFields";
import { Button } from "@/app/components/ui/form-elements/Button";

export const SignIn: FC = () => {
	useAuthRedirect()
	
	const { isLoading } = useAuth()
	const { signIn } = useActions()
	
	const {
		register: registerInput,
		handleSubmit,
		formState,
		reset,
	} = useForm<ISignInInput>({
		mode: 'onChange',
	})
	
	const handlerSignIn: SubmitHandler<ISignInInput> = async (data) => {
		signIn(data);
		reset();
	}
	
	return (
		<Meta title={'Sign In'}>
			<section className={styles.wrapper}>
				<form onSubmit={handleSubmit(handlerSignIn)}>
					<Heading title={'Sign in'} className={'mb-6'} />
				
					<SignInFields
						formState={formState}
						register={registerInput}
						isPasswordRequired
					/>
					
					<Button type={'submit'} disabled={isLoading}>Authentication</Button>
				
				</form>
			</section>
		</Meta>
	)
}
