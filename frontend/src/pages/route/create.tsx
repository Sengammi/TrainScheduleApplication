import { NextPageAuth } from "@/shared/types/auth.types";
import { RouteEdit } from "@/components/screens/admin/route/RouteEdit";

const CreateRoutePage: NextPageAuth = () => {
	return (
		<RouteEdit isCreate={true}/>
	)
}

CreateRoutePage.isOnlyAdmin;

export default CreateRoutePage;