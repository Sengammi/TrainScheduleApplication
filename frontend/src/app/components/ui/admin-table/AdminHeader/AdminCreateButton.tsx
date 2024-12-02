import { FC } from 'react'

import { Button } from "@/app/components/ui/form-elements/Button";

export const AdminCreateButton: FC<{ onClick: () => void }> = ({ onClick }) => {
	return <Button onClick={onClick}>
		Create new	</Button>
}
