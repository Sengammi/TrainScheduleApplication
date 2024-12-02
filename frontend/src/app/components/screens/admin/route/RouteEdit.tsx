import { FC } from 'react'
import { useForm } from "react-hook-form";
import { Meta } from "@/app/meta/Meta";
import { Heading } from "@/ui/heading/Heading";
import { SkeletonLoader } from "@/ui/SkeletonLoader";
import { Button } from "@/ui/form-elements/Button";
import { IRouteEditInput } from "@/components/screens/admin/route/route-edit.interface";
import { useRouteEdit } from "@/components/screens/admin/route/useRouteEdit";
import { RouteEditFields } from "@/components/screens/admin/route/RouteFields";



export const RouteEdit: FC<{ isCreate?: boolean }> = ({isCreate = false}) => {
	const {
		handleSubmit,
		register,
		formState,
		setValue,
		control
	} = useForm<IRouteEditInput>({mode: 'onChange'})
	
	const { isLoading, onSubmitUpdate, onSubmitCreate } = useRouteEdit(setValue)
	
	return (
		<Meta title={isCreate? 'Create route' : 'Edit route'}>
			<Heading title={isCreate? 'Create route' : 'Edit route'} />
			<form onSubmit={handleSubmit(isCreate ? onSubmitCreate : onSubmitUpdate)} className={'w-1/2 flex flex-col min-w-96 mx-auto gap-y-3 mt-10'}>
				{isLoading ? (
					<>
						<SkeletonLoader count={2} className={'h-10 mb-4'}/>
						<SkeletonLoader count={1} className={'h-10 mt-1'}/>
					</>
				) : (
					<>
						<RouteEditFields
							register={register}
							formState={formState}
							control={control}
						/>
						<Button className={''} type={"submit"}>{isCreate
																			 ? 'Create route'
																			 : 'Update route data'} </Button>
					</>
				)}
			</form>
		</Meta>
	)
}
