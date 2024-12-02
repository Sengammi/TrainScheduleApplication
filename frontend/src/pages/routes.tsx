import { RouteList } from "@/components/screens/admin/routes/RouteList";
import { NextPageAuth } from "@/shared/types/auth.types";

const RoutesPage: NextPageAuth = () => {
	return (
		<RouteList />
	)
}

RoutesPage.isOnlyAdmin;

export default RoutesPage;