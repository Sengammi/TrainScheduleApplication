import { FC, useEffect, useState } from 'react'
import { useAuth } from "@/hooks/useAuth";
import { AuthItem } from "@/app/components/layout/Navigation/Menu/Auth/AuthItem";
import { adminMenu } from "@/app/components/layout/Navigation/Menu/menu.data";
import { MenuItem } from "@/app/components/layout/Navigation/Menu/MenuItem";

export const Menu: FC = () => {
	const { user } = useAuth();
	const [ role, setRole ] = useState<'guest' | 'user' | 'admin'>('guest');
	const { items } = adminMenu;
	
	useEffect(() => {
		user?.isAdmin
		?setRole('admin')
		:user
		 ?setRole('user')
		 :setRole('guest');
	}, [user]);
	
	return (
		<ul>
			<MenuItem item={{
				title: 'Schedule',
				link: '/'
			}}/>
			
			{role === 'admin' && items.map((item, index) => (
				<MenuItem item={item} key={index}/>
			))}
			
			<AuthItem></AuthItem>
		</ul>
	)
}
