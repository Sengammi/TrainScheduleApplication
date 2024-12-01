import { FC } from 'react'

interface IHeading {
	title: string
	className?: string
}

export const Heading: FC<IHeading> = ({ title, className }) => {
	return (
		<h1 className={`text-lighting text-dark text-opacity-85 font-semibold ${
				className?.includes('xl') ? '' : 'text-4xl'
			} ${className}`}
		>
			{title}
		</h1>
	)
}
