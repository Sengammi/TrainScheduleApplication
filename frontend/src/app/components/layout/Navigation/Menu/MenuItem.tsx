import { FC } from 'react'
import { useRouter } from "next/router";
import Link from "next/link";
import { IMenuItem } from "@/app/components/layout/Navigation/Menu/menu.interface";
import cn from 'classnames'

import styles from './MenuItem.module.scss'

export const MenuItem: FC<{item: IMenuItem}> = ({item}) => {
	const { asPath } = useRouter()
	
	return (
		<li className={cn({
			[styles.active]: asPath === item.link,
			[styles.item]: true,
		})}>
			<Link href={item.link}>
				<span>{item.title}</span>
			</Link>
		</li>
	)
}
