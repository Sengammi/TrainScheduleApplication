import { FC, PropsWithChildren } from 'react'
import { HeadProvider } from "@/app/providers/HeadProvider";
import { QueryClient, QueryClientProvider } from "react-query";
import { Layout } from "@/app/components/layout/Layout";
import { ReduxToast } from "@/app/providers/ReduxToast";

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
			<QueryClientProvider client={queryClient}>
				<ReduxToast/>
				<Layout>
					{children}
				</Layout>
			</QueryClientProvider>
		</HeadProvider>
	)
}
