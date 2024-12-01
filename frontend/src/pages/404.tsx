import { Meta } from "@/app/meta/Meta";
import { Heading } from "@/app/components/ui/heading/Heading";

export default function Error404() {
	return (
		<Meta title={'Page Not Found'}>
			<Heading title={'404 - Page Not Found'} className={'mt-96'}/>
		</Meta>
	)
}
