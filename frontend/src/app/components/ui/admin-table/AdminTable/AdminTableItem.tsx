import { FC } from 'react'

import styles from './AdminTable.module.scss'
import { IAdminTableItem } from "@/ui/admin-table/AdminTable/admin-table.interface";
import { AdminActions } from "@/ui/admin-table/AdminTable/AdminActions/AdminActions";

export const AdminTableItem:FC<IAdminTableItem> = ({tableItem, removeHandler}) => {
  return (
		<div className={styles.item}>
			{tableItem.items.map((item) => (
				<div key={item}>{item}</div>
			))}

			<AdminActions removeHandler={removeHandler} editUrl={tableItem.editUrl}/>
		</div>
  )
}
