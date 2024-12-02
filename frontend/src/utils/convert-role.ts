export const ConvertRole = (isAdmin: string | boolean) => {
	return isAdmin
		? 'Admin'
		: 'User';
}