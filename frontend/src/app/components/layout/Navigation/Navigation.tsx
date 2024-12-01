import { FC } from 'react'

import styles from './Navigation.module.scss'
import { Menu } from "@/app/components/layout/Navigation/Menu/Menu";

export const Navigation: FC = () => {
	return (
		<div className={styles.navigation}>
			<Menu/>
		</div>
	)
}
