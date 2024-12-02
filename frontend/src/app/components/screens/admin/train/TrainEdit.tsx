import { FC } from 'react'
import { useForm } from "react-hook-form";
import { ITrainEditInput } from "@/components/screens/admin/train/train-edit.interface";
import { useTrainEdit } from "@/components/screens/admin/train/useTrainEdit";
import { Meta } from "@/app/meta/Meta";
import { Heading } from "@/ui/heading/Heading";
import { SkeletonLoader } from "@/ui/SkeletonLoader";
import { Button } from "@/ui/form-elements/Button";
import { TrainEditFields } from "@/components/screens/admin/train/TrainFields";



export const TrainEdit: FC<{ isCreate?: boolean }> = ({isCreate = false}) => {
	const {
		handleSubmit,
		register,
		formState,
		setValue,
	} = useForm<ITrainEditInput>({mode: 'onChange'})
	
	const { isLoading, onSubmitUpdate, onSubmitCreate } = useTrainEdit(setValue)
	
	return (
		<Meta title={isCreate? 'Create train' : 'Edit train'}>
			<Heading title={isCreate? 'Create train' : 'Edit train'} />
			<form onSubmit={handleSubmit(isCreate ? onSubmitCreate : onSubmitUpdate)} className={'w-1/2 flex flex-col min-w-96 mx-auto gap-y-3 mt-10'}>
				{isLoading ? (
					<>
						<SkeletonLoader count={2} className={'h-10 mb-4'}/>
						<SkeletonLoader count={1} className={'h-10 mt-1'}/>
					</>
				) : (
					<>
						<TrainEditFields
							register={register}
							formState={formState}
						/>
						<Button className={''} type={"submit"}>{isCreate
																			 ? 'Create train'
																			 : 'Update train data'} </Button>
					</>
				)}
			</form>
		</Meta>
	)
}
