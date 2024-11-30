import { FC, PropsWithChildren } from 'react'
import Head from "next/head";

export const HeadProvider: FC<PropsWithChildren> = ({children}) => {
	
	const headProviderColor = "#ffffff"
	
	return (
		<>
			<Head>
				<meta charSet='UTF-8'/>
				<meta name='viewport' content='width=device-width, initial-scale=1.0'/>
				
				<link
					rel='shortcut icon'
					href='/favicon.svg'
					type='image/x-icon'
				/>
				
				<meta name='theme-color' content={headProviderColor}/>
				<meta name='msapplication-navbutton-color' content={headProviderColor}/>
				<meta name='apple-mobile-web-app-status-bar-style' content={headProviderColor}/>
			</Head>
			{children}
		</>
	)
}
