import { FC, PropsWithChildren } from 'react'
import { Meta } from '@/app/meta/Meta'
import { Heading } from '@/app/components/ui/heading/Heading'
import { AdminHeader } from '@/app/components/ui/admin-table/AdminHeader/AdminHeader'
import { useUsers } from '@/app/components/screens/admin/users/useUsers'
import { AdminTable } from '@/app/components/ui/admin-table/AdminTable/AdminTable'

export const UserList: FC<PropsWithChildren> = ({ children }) => {
	const { handleSearch, isLoading, searchTerm, data, deleteAsync } = useUsers()

	return (
		<Meta title={'Users'}>
			<Heading title={'Users'} />

			<AdminHeader handleSearch={handleSearch} searchTerm={searchTerm}/>
			<AdminTable
				isLoading={isLoading}
				headerItems={['Email', 'Username', 'Date register', 'Role']}
				tableItems={data || []}
				removeHandler={(_id: string) => {
					const youSure = confirm(
						'Are you sure you want to delete this user?'
					)
					return youSure ? deleteAsync(_id) : null
				}}
			/>
		</Meta>
	)
}
