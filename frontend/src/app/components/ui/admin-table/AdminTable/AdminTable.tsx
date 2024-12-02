import { FC } from 'react'

import styles from './AdminTable.module.scss'
import { ITableItem } from "@/app/components/ui/admin-table/AdminTable/admin-table.interface";
import { AdminTableHeader } from "@/app/components/ui/admin-table/AdminTable/AdminTableHeader";
import { SkeletonLoader } from "@/app/components/ui/SkeletonLoader";
import { AdminTableItem } from "@/app/components/ui/admin-table/AdminTable/AdminTableItem";

interface IAdminTable {
	tableItems: ITableItem[],
	isLoading: boolean,
	headerItems: string[],
	removeHandler: (id: string) => void;
}

export const AdminTable:FC<IAdminTable> = ({tableItems, isLoading, headerItems, removeHandler}) => {
	return (
    <div className={styles.table}>
    	<AdminTableHeader headerItems={headerItems}/>

		 {isLoading
			 ? <SkeletonLoader count={2} height={48} className={'mt-4'}></SkeletonLoader>
			 : tableItems.length
				 ? tableItems.map(tableItem => <AdminTableItem key={tableItem._id} tableItem={tableItem} removeHandler={() => removeHandler(tableItem._id)}/>)
				 : <div className={styles.notFound}>Elements not found</div>
		 }

    </div>
  )
}
