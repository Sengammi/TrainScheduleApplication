import { UserList } from "@/components/screens/admin/users/UserList";
import { NextPageAuth } from "@/shared/types/auth.types";

const UsersPage: NextPageAuth = () => {
	return (
		<UserList/>)
}

UsersPage.isOnlyAdmin;

export default UsersPage;