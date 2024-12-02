import { FC } from 'react'
import * as MaterialIcons from 'react-icons/md'

export type TypeMaterialIconName = keyof typeof MaterialIcons;

export const MaterialIcon: FC<{name: TypeMaterialIconName}> = ({name}) => {
	const IconComponent = MaterialIcons[name]

	// @ts-ignore
	return <IconComponent /> || <MaterialIcons.MdDragIndicator/>
}