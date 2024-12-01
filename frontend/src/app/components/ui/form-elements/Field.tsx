import { forwardRef } from 'react'
import { IField } from "@/app/components/ui/form-elements/form-interface";
import cn from "classnames";

import styles from './Form.module.scss'

export const Field = forwardRef<HTMLInputElement, IField>(
	({placeholder, error, type = 'text', style, ...rest}, ref) => {
		return (
			<div className={cn(styles.common, styles.field)}>
				<label>
					<span>{placeholder}</span>
					<input ref={ref} type={type} {...rest}/>
				</label>
				{error && <div className={styles.error}>{error.message}</div>}
			</div>
		)
})

Field.displayName = 'Field';