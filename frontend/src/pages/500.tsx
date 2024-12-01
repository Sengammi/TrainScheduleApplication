import { Meta } from "@/app/meta/Meta";
import { Heading } from "@/app/components/ui/heading/Heading";

export default function Error500() {
	return (
		<Meta title={'Page Not Found'}>
			<Heading title={'500 - Page Not Found'} className={'mt-96'}/>
		</Meta>
	)
}
