import { NextPageAuth } from "@/shared/types/auth.types";
import { TrainEdit } from "@/components/screens/admin/train/TrainEdit";

const TrainPage: NextPageAuth = () => {
	return (
		<TrainEdit/>
	)
}

TrainPage.isOnlyAdmin = true;

export default TrainPage;