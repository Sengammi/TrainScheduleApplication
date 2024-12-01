import { FC, PropsWithChildren } from 'react'
import { HeadProvider } from "@/app/providers/HeadProvider";
import { QueryClient, QueryClientProvider } from "react-query";
import { Layout } from "@/app/components/layout/Layout";
import { ReduxToast } from "@/app/providers/ReduxToast";
import { Provider } from "react-redux";
import { store } from "@/store/store";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
})

export const MaineProvider: FC<PropsWithChildren> = ({children}) => {
	return (
		<HeadProvider>
			<Provider store={store}>
				<QueryClientProvider client={queryClient}>
					<ReduxToast/>
					<Layout>
						{children}
					</Layout>
				</QueryClientProvider>
			</Provider>
		</HeadProvider>
	)
}
