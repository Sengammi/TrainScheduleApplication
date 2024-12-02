import { FC } from 'react'

import styles from './AdminTable.module.scss'
import cn from "classnames";

export const AdminTableHeader: FC<{ headerItems: string[] }> = ({ headerItems }) => {
	return <div className={cn(styles.item, styles.itemHeader)}>
		{headerItems.map(item =>{
			return <div key={item}>{item}</div>
		})}
		<div className="">Actions</div>
	</div>
}
