import { FC, PropsWithChildren } from 'react'
import { TypeComponentAuthFields } from "@/shared/types/auth.types";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/router";

export const CheckRole: FC<PropsWithChildren<TypeComponentAuthFields>> = ({children, Component: {isOnlyAdmin, isOnlyUser}}) => {
	const { user } = useAuth();
	const router = useRouter();
	const Children = () => <>{children}</>
	
	if (!isOnlyUser && !isOnlyAdmin){
		return <Children/>
	}
	
	if (user?.isAdmin){
		return <Children/>
	}
	
	if (isOnlyAdmin){
		router.pathname !== '/404' && router.replace('/404')
		return null;
	}
	
	const isUser = user && !user.isAdmin
	
	if (isUser && isOnlyUser){
		return <Children/>
	} else {
		router.pathname !== '/sign-in' && router.replace('/sign-in')
		return null;
	}
}

export default CheckRole;
