import { FormState, UseFormRegister } from "react-hook-form";
import { FC } from "react";
import { Field } from "@/app/components/ui/form-elements/Field";
import { validEmail } from "@/shared/regex";


interface IAuthFields {
	register: UseFormRegister<any>
	formState: FormState<any>
	isPasswordRequired?: boolean
}

export const SignInFields: FC<IAuthFields> = ({ register, formState: {errors}, isPasswordRequired = false }) => {
	return (
		<>
			<Field
				{...register('email', {
					required: 'Email is required',
					pattern: {
						value: validEmail,
						message: 'Enter a valid email'
					}
				})}
				placeholder={'Email'}
				error={errors.email}
			/>
			
			<Field
				{...register('password', isPasswordRequired ?
					{
						required: 'Password is required',
						minLength: {
							value: 6,
							message: 'Enter your password'
						}
					} : {}
				)}
				placeholder={'Password'}
				type={'password'}
				error={errors.password}
			/>
		</>
	)
}

export const SignUpFields: FC<IAuthFields> = ({ register, formState: {errors}, isPasswordRequired = false }) => {
	return (
		<>
			<Field
				{...register('username', {
					required: 'Username is required',
					minLength: {
						value: 2,
						message: 'Enter a valid name'
					}
				})}
				placeholder={'Username'}
				error={errors.username}
			/>
			
			<Field
				{...register('email', {
					required: 'Email is required',
					pattern: {
						value: validEmail,
						message: 'Enter a valid email'
					}
				})}
				placeholder={'Email'}
				error={errors.email}
			/>
			
			<Field
				{...register('password', isPasswordRequired ?
					{
						required: 'Password is required',
						minLength: {
							value: 6,
							message: 'Enter your password'
						}
					} : {}
				)}
				placeholder={'Password'}
				type={'password'}
				error={errors.password}
			/>
		</>
	)
}