import { ChangeEvent, FC } from 'react'

import styles from './AdminHeader.module.scss'
import { SearchField } from "@/app/components/ui/search-field/SearchField";
import { AdminCreateButton } from "@/app/components/ui/admin-table/AdminHeader/AdminCreateButton";

interface IAdminHeader {
	onClick?: () => void;
	searchTerm: string;
	handleSearch: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const AdminHeader:FC<IAdminHeader> = ({searchTerm, handleSearch, onClick}) => {
  return (
    <div className={styles.header}>
    	<SearchField searchTerm={searchTerm} handleSearch={handleSearch}/>
		 {onClick && <AdminCreateButton onClick={onClick} />}
    </div>
  )
}
