import { axiosClassic } from "@/api/interceptors";
import { IRoute } from "@/shared/types/schedule.types";
import { getRoutesUrl } from "@/config/api.config";
import axios from "../api/interceptors";

export const RouteService = {
	async getAll(from?: string, to?: string, departureDate?: string, sortParam?: string) {
		return await axiosClassic.get<IRoute[]>(getRoutesUrl(''), {
			params: {
				from,
				to,
				departureDate,
				sortParam
			}
		})
	},
	
	async create(data: IRoute) {
		return await axios.post<IRoute>(getRoutesUrl(''), data)
	},
	
	async getById(_id: string) {
		return await axios.get<IRoute>(getRoutesUrl(`${_id}`))
	},
	
	async update(_id: string, data: IRoute) {
		return await axios.patch<IRoute>(getRoutesUrl(`${_id}`), data)
	},
	
	async delete(_id: string) {
		return await axios.delete<IRoute>(getRoutesUrl(`${_id}`))
	}
}