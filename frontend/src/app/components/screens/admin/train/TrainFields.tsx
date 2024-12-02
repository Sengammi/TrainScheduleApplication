import { FC } from "react";
import { Field } from "@/ui/form-elements/Field";
import { FormState, UseFormRegister } from "react-hook-form";

interface ITrainFields {
	register: UseFormRegister<any>
	formState: FormState<any>
}

export const TrainEditFields: FC<ITrainFields> = ({ register, formState: {errors}}) => {
	return (
		<>
			<Field
				{...register('number', {
					required: 'Number is required',
					minLength: {
						value: 3,
						message: 'Number is too short'
					}
				})}
				placeholder={'Train number'}
				type={'text'}
				error={errors.number}
			/>
			
			<Field
				{...register('name', {
					required: 'Name is required',
					minLength: {
						value: 3,
						message: 'Name is too short'
					}
				})}
				placeholder={'Train name'}
				type={'text'}
				error={errors.name}
			/>
		</>
	)
}