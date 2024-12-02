import { FC } from 'react'
import Skeleton, { SkeletonProps } from "react-loading-skeleton";
import cn from "classnames";
import 'react-loading-skeleton/dist/skeleton.css'

export const SkeletonLoader: FC<SkeletonProps> = ({className, ...rest}) => {
	return <Skeleton {...rest} baseColor={'#DEF2F1'}
	highlightColor={"#aadfdd"}
	className={cn('rounded-lg', className)}/>
}
