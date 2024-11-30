import { AppProps } from 'next/app'
import '@/assets/styles/globals.scss'
import { MaineProvider } from "@/app/providers/MaineProvider";


const MyApp = ({Component, pageProps}: AppProps) => {
	return (
		<MaineProvider>
			<Component {...pageProps}/>
		</MaineProvider>
	)
}

export default MyApp;