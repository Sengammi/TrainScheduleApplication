import { Account } from "@/app/components/screens/account/Account";
import { NextPageAuth } from "@/shared/types/auth.types";

const AccountPage: NextPageAuth = () => {
	return (
		<Account/>
	)
}

AccountPage.isOnlyUser = true;

export default AccountPage;