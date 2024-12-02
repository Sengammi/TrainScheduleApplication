import { NextPageAuth } from "@/shared/types/auth.types";
import { UserEdit } from "@/components/screens/admin/user/UserEdit";

const UserPage: NextPageAuth = () => {
	return (
		<UserEdit/>
	)
}

UserPage.isOnlyAdmin;

export default UserPage;