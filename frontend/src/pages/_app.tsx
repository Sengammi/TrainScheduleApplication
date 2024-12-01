import { AppProps } from 'next/app'
import '@/assets/styles/globals.scss'
import { MaineProvider } from "@/app/providers/MaineProvider";
import { TypeComponentAuthFields } from "@/shared/types/auth.types";

type TypeAppProps = AppProps & TypeComponentAuthFields

const MyApp = ({Component, pageProps}: TypeAppProps) => {
	return (
		<MaineProvider Component={Component}>
			<Component {...pageProps}/>
		</MaineProvider>
	)
}

export default MyApp;