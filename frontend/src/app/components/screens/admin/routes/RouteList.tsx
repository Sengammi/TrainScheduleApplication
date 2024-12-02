import { FC, PropsWithChildren } from 'react'
import { Meta } from '@/app/meta/Meta'
import { Heading } from '@/app/components/ui/heading/Heading'
import { AdminTable } from '@/app/components/ui/admin-table/AdminTable/AdminTable'
import { useRoute } from "@/components/screens/admin/routes/useRoute";
import styles from "@/ui/admin-table/AdminHeader/AdminHeader.module.scss";
import { SearchField } from "@/ui/search-field/SearchField";
import { AdminCreateButton } from "@/ui/admin-table/AdminHeader/AdminCreateButton";
import { Field } from "@/ui/form-elements/Field";

export const RouteList: FC<PropsWithChildren> = ({ children }) => {
	const { handleFrom, handleTo, handleDate, isLoading, from, to, departureDate, sortParam, data, deleteAsync, createAsync } = useRoute()

	return (
		<Meta title={'Route'}>
			<Heading title={'Route'}/>
			
			<div className={styles.routeHeader}>
				<div>
					<label>From</label>
					<SearchField searchTerm={from} handleSearch={handleFrom}/>
				</div>
				<div>
					<label>To</label>
					<SearchField searchTerm={to} handleSearch={handleTo}/>
				</div>
				<div>
					<label>Date</label>
					<Field onChange={handleDate} placeholder={''} type={"date"} onClick={()=>{}}  />
				</div>
				<AdminCreateButton onClick={createAsync}/>
			</div>
			<AdminTable
				isLoading={isLoading}
				headerItems={[ 'Train', 'From', 'To', 'Departure Date', 'Arrival Date' ]}
				tableItems={data || []}
				removeHandler={(_id: string) => {
					const youSure = confirm(
						'Are you sure you want to delete this route?'
					)
					return youSure
							 ? deleteAsync(_id)
							 : null
				}}
			/>
		</Meta>
	)
}
