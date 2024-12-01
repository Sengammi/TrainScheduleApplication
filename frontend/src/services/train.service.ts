import { axiosClassic } from "@/api/interceptors";
import { ITrain } from "@/shared/types/schedule.types";
import { getTrainsUrl } from "@/config/api.config";
import axios from "../api/interceptors";


export const TrainService = {
	async getAll(searchParam?: string, sortParam?: string) {
		return await axiosClassic.get<ITrain[]>(getTrainsUrl(''),{
			params: {
				searchParam,
				sortParam
			}
		})
	},
	
	async getByName(name: string) {
		return await axiosClassic.get<ITrain[]>(getTrainsUrl(`by-name/${name}`))
	},
	
	async getByNumber(number: string) {
		return await axiosClassic.get<ITrain[]>(getTrainsUrl(`by-number/${number}`))
	},
	
	async getById(_id: string) {
		return await axios.get<ITrain>(getTrainsUrl(`${_id}`))
	},
	
	async create(data: ITrain) {
		return await axios.put<ITrain>(getTrainsUrl(''), data)
	},
	
	async update(_id: string, data: ITrain) {
		return await axios.patch<ITrain>(getTrainsUrl(`${_id}`), data)
	},
	
	async delete(_id: string) {
		return await axios.delete<ITrain>(getTrainsUrl(`${_id}`))
	},
}