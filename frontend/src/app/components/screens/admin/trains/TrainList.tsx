import { FC, PropsWithChildren } from 'react'
import { Meta } from '@/app/meta/Meta'
import { Heading } from '@/app/components/ui/heading/Heading'
import { AdminHeader } from '@/app/components/ui/admin-table/AdminHeader/AdminHeader'
import { AdminTable } from '@/app/components/ui/admin-table/AdminTable/AdminTable'
import { useTrains } from "@/components/screens/admin/trains/useTrains";

export const TrainList: FC<PropsWithChildren> = ({ children }) => {
	const { handleSearch, isLoading, searchTerm, data, deleteAsync, createAsync } = useTrains()

	return (
		<Meta title={'Trains'}>
			<Heading title={'Trains'} />

			<AdminHeader handleSearch={handleSearch} searchTerm={searchTerm} onClick={createAsync}/>
			<AdminTable
				isLoading={isLoading}
				headerItems={['Number', 'Name']}
				tableItems={data || []}
				removeHandler={(_id: string) => {
					const youSure = confirm(
						'Are you sure you want to delete this train?'
					)
					return youSure ? deleteAsync(_id) : null
				}}
			/>
		</Meta>
	)
}
