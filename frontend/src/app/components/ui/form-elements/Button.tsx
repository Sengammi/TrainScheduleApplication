import { FC } from 'react'
import cn from 'classnames'

import styles from './form.module.scss'
import { IButton } from "@/app/components/ui/form-elements/form-interface";
export const Button:FC<IButton> = ({children ,className, ...rest}) => {
  return (
		<button className={cn(styles.button, className)} {...rest}>
			{children}
		</button>
  )
}
