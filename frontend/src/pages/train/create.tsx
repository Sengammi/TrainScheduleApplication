import { NextPageAuth } from "@/shared/types/auth.types";
import { TrainEdit } from "@/components/screens/admin/train/TrainEdit";

const CreateTrainPage: NextPageAuth = () => {
	return (
		<TrainEdit isCreate={true}/>
	)
}

CreateTrainPage.isOnlyAdmin = true;

export default CreateTrainPage;