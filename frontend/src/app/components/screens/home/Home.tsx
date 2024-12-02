import { FC } from 'react'
import { Meta } from "@/app/meta/Meta";
import { Heading } from "@/app/components/ui/heading/Heading";
import { AdminTable } from "@/ui/admin-table/AdminTable/AdminTable";
import { useRoute } from "@/components/screens/admin/routes/useRoute";
import styles from "@/ui/admin-table/AdminHeader/AdminHeader.module.scss";
import { SearchField } from "@/ui/search-field/SearchField";
import { Field } from "@/ui/form-elements/Field";
import cn from "classnames";

export const Home: FC = () => {
	const { handleFrom, handleTo, handleDate, handleSort, isLoading, from, to, data, today} = useRoute()
	
	return (
		<Meta title={'Train Schedule'}
				description='Train Schedule Applicatin'>
			<Heading title={`Train's Schedule:`} className={'text-3xl'}/>
			
			<div className={cn(styles.routeHeader, styles.homePage)}>
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
					<Field defaultValue={today} onChange={handleDate} placeholder={''} type={"date"} onClick={() => {}}/>
				</div>
				<div className={styles.sorts}>
					<label>Sort</label>
					
					<div>
							<Field
								placeholder={'By Date'}
								type={"radio"}
								name={'sort'}
								id="departureDate"
								defaultChecked={true}
								onChange={handleSort}
							></Field>
					</div>
					<div>
							<Field
								placeholder={'By From'}
								type={"radio"}
								name={'sort'}
								id="from"
								onChange={handleSort}
							></Field>
					</div>
					<div>
							<Field
								placeholder={'By To'}
								type={"radio"}
								name={'sort'}
								id="to"
								onChange={handleSort}
							></Field>
					</div>
				</div>
			</div>
			
			<AdminTable
				isLoading={isLoading}
				headerItems={[ 'Train', 'From', 'To', 'Departure Date', 'Arrival Date' ]}
				tableItems={data || []}
				actions={false}
			/>
		
		</Meta>
	)
}
