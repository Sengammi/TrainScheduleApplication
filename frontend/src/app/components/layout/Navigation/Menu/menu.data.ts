import { IMenu } from "@/app/components/layout/Navigation/Menu/menu.interface";


export const adminMenu: IMenu = {
	title: 'Admin Menu',
	items: [
		{
			link: '/routes',
			title: 'Routes',
		},{
			link: '/trains',
			title: 'Trains',
		},{
			link: '/users',
			title: 'Users',
		},
	],
}