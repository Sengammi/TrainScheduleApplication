import { FormState, UseFormRegister } from "react-hook-form";
import { FC } from "react";
import { Field } from "@/app/components/ui/form-elements/Field";
import { validEmail } from "@/shared/regex";


interface IAccountFields {
	register: UseFormRegister<any>
	formState: FormState<any>
}



export const UpdateAccountFields: FC<IAccountFields> = ({ register, formState: {errors}}) => {
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
		</>
	)
}

export const ChangePasswordFields: FC<IAccountFields> = ({ register, formState: {errors}}) => {
	return (
		<>
			<Field
				{...register('password', {
					required: 'Password is required',
					minLength: {
						value: 6,
						message: 'Enter your password'
					}
				})}
				placeholder={'Password'}
				type={'password'}
				error={errors.password}
			/>
		</>
	)
}

export const ChangeRoleFields: FC<IAccountFields> = ({ register, formState: {errors}}) => {
	return (
		<>
			<Field
				{...register('isAdmin', {
					required: false,
					value: {
						type: 'boolean',
					}
				})}
				placeholder={'Admin role'}
				type={'checkbox'}
				error={errors.isAdmin}
			/>
		</>
	)
}