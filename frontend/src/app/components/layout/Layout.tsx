import { FC, PropsWithChildren } from 'react'

import styles from './Layout.module.scss'
import { Navigation } from "./Navigation/Navigation";

export const Layout: FC<PropsWithChildren> = ({children}) => {
	return (
		<div className={styles.layout}>
			<Navigation/>
			{children}
		</div>
	)
}
