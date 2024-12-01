import { FC, ComponentType, PropsWithChildren, useEffect } from "react";
import { TypeComponentAuthFields } from "@/shared/types/auth.types";
import dynamic from "next/dynamic";
import { useAuth } from "@/hooks/useAuth";
import { useActions } from "@/hooks/useActions";
import { useRouter } from "next/router";
import Cookies from "js-cookie";


const DynamicCheckRole: ComponentType<PropsWithChildren<TypeComponentAuthFields>> = dynamic(() => import('./CheckRole'), {ssr: false});

export const AuthProvider: FC<PropsWithChildren<TypeComponentAuthFields>> = ({children, Component: {isOnlyAdmin, isOnlyUser}}) => {
	const { user } = useAuth()
	const{ singOut, checkAuth } = useActions()
	const { pathname } = useRouter()
	
	useEffect(() => {
		const accessToken = Cookies.get('accessToken')
		if (accessToken) {
			checkAuth();
		}
	}, []);
	
	useEffect(() => {
		const refreshToken = Cookies.get('refreshToken')
		if (!refreshToken && user) {
			singOut();
		}
	}, [pathname]);
	
	return !isOnlyAdmin && !isOnlyUser ? (<>{children}</>) : (
		<DynamicCheckRole Component={{isOnlyAdmin, isOnlyUser}}>
			{children}
		</DynamicCheckRole>
	)
}
