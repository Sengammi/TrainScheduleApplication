import { FC } from 'react'

import styles from './AdminTable.module.scss'
import cn from "classnames";

export const AdminTableHeader: FC<{ headerItems: string[], actions?: boolean }> = ({ headerItems, actions = true }) => {
	return <div className={cn(styles.item, styles.itemHeader)}>
		{headerItems.map(item =>{
			return <div key={item}>{item}</div>
		})}
		{actions && <div className="">Actions</div>}
	</div>
}
