import { FC } from 'react'

import styles from './AdminActions.module.scss'
import { useRouter } from "next/router";
import { Button } from "@/ui/form-elements/Button";
import { MaterialIcon } from "@/ui/MaterialIcon";

interface IAdminActions {
	editUrl: string;
	removeHandler: () => void;
}

export const AdminActions:FC<IAdminActions> = ({editUrl, removeHandler}) => {

	const { push } = useRouter()

  return (
    <div className={styles.actions}>
		<Button onClick={() => push(editUrl)}>
			<MaterialIcon name={"MdEdit"}/>
		</Button>
		<Button onClick={() => removeHandler()}>
			<MaterialIcon name={"MdClose"}/>
		</Button>
	 </div>
  )
}
