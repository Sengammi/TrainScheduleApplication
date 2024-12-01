export interface ITrain {
	_id: string;
	number: string;
	name: string;
}

export interface IRoute {
	_id: string;
	train: ITrain,
	from: string,
	to: string,
	departureDate: Date,
	arrivalDate: Date,
}