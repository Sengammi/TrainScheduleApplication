import { FC, useEffect, useState, MouseEvent } from 'react'
import { useAuth } from "@/hooks/useAuth";
import { MenuItem } from "@/app/components/layout/Navigation/Menu/MenuItem";
import Link from "next/link";
import { useActions } from "@/hooks/useActions";

import styles from '../MenuItem.module.scss'

export const AuthItem: FC = () => {
	const { user } = useAuth()
	const { signOut } = useActions()
	const [ role, setRole ] = useState<'guest' | 'user' | 'admin'>('guest');
	
	const handleSignOut = (e: MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault();
		signOut();
	}
	
	useEffect(() => {
		user?.isAdmin
			?setRole('admin')
			:user
			 ?setRole('user')
			 :setRole('guest');
	}, [user]);
	
	return (
		<>
			{role === 'admin' || role === 'user'
				?<>
					 <MenuItem item={{
						 link: '/account',
						 title: 'Account'
					 }}/>
						
					 <li>
						 <Link onClick={handleSignOut} href={'#'} className={styles.signOut}>
							<span>Sign Out</span>
						 </Link>
					 </li>
					
			 	</>
				:<>
					 <MenuItem item={{
						 link: '/sign-in',
						 title: 'Sign In',
					 }}/>
				 
					 <MenuItem item={{
						 link: '/sign-up',
						 title: 'Sign Up',
					 }}/>
			 	</>
			}
		</>
	)
}
