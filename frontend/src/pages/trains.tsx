import { TrainList } from "@/components/screens/admin/trains/TrainList";
import { NextPageAuth } from "@/shared/types/auth.types";

const TrainsPage: NextPageAuth = () => {
	return (
		<TrainList />
	)
}

TrainsPage.isOnlyAdmin;

export default TrainsPage;