import { NextPageAuth } from "@/shared/types/auth.types";
import { RouteEdit } from "@/components/screens/admin/route/RouteEdit";

const RoutePage: NextPageAuth = () => {
	return (
		<RouteEdit/>
	)
}

RoutePage.isOnlyAdmin = true;

export default RoutePage;