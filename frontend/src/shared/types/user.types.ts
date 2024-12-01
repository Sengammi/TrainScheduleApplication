export interface IUser {
	_id: string;
	username: string;
	email: string;
	password: string;
	createdAt: string;
	isAdmin: boolean;
}

export interface IPassword {
	password: string;
}