export interface ISignInInput {
	email: string;
	password: string;
}

export interface ISignUpInput extends ISignInInput {
	username: string;
}