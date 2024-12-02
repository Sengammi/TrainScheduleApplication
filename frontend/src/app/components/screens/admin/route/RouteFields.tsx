import { ComponentType, FC } from "react";
import { Field } from "@/ui/form-elements/Field";
import { Control, Controller, FormState, UseFormRegister } from "react-hook-form";
import dynamic from "next/dynamic";
import { ISelect } from "@/ui/select/select.interface";
import { useAdminTrains } from "@/components/screens/admin/route/useAdminTrains";

interface IRouteFields {
	register: UseFormRegister<any>
	formState: FormState<any>
	control: Control<any>
}

const DynamicSelect: ComponentType<ISelect> = dynamic(
	() => import('@/ui/select/Select'),
	{
		ssr: false,
	}
)

export const RouteEditFields: FC<IRouteFields> = ({ register, formState: {errors}, control}) => {
	
	const { isLoading: isTrainsLoading, data: trains} = useAdminTrains()
	
	return (
		<>
			<Controller control={control} name={'train'} render={({field, fieldState: {error}}) => (
				<DynamicSelect
					field={field}
					options={trains || []}
					isLoading={isTrainsLoading}
					placeholder={'Train'}
					error={error}
				/>
			)
			
			} />
			
			<Field
				{...register('from', {
					required: 'From field is required',
					minLength: {
						value: 3,
						message: 'From field is too short'
					}
				})}
				placeholder={'From'}
				type={'text'}
				error={errors.from}
			/>
			
			<Field
				{...register('to', {
					required: 'To field is required',
					minLength: {
						value: 3,
						message: 'To field is too short'
					}
				})}
				placeholder={'To'}
				type={'text'}
				error={errors.to}
			/>
			
			<Field
				{...register('departureDate', {
					required: 'Departure date is required',
				})}
				placeholder={'Departure date'}
				type={'datetime-local'}
				error={errors.departureDate}
			/>
			
			<Field
				{...register('arrivalDate', {
					required: 'Arrival date is required',
				})}
				placeholder={'Arrival date'}
				type={'datetime-local'}
				error={errors.arrivalDate}
			/>
		</>
	)
}