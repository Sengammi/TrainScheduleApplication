export const ConvertRole = (isAdmin: string) => {
	return isAdmin
		? 'Admin'
		: 'User';
}