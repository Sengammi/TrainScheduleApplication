import { FC, PropsWithChildren } from 'react'
import { HeadProvider } from "@/app/providers/HeadProvider";
import { QueryClient, QueryClientProvider } from "react-query";
import { Layout } from "@/app/components/layout/Layout";
import { ReduxToast } from "@/app/providers/ReduxToast";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import { AuthProvider } from "@/app/providers/AuthProvider";
import { TypeComponentAuthFields } from "@/shared/types/auth.types";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
})

export const MaineProvider: FC<PropsWithChildren<TypeComponentAuthFields>> = ({children, Component}) => {
	return (
		<HeadProvider>
			<Provider store={store}>
				<QueryClientProvider client={queryClient}>
					<ReduxToast/>
					<Layout>
						<AuthProvider Component={Component}>
							{children}
						</AuthProvider>
					</Layout>
				</QueryClientProvider>
			</Provider>
		</HeadProvider>
	)
}
