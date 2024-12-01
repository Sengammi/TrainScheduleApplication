import { axiosClassic } from "@/api/interceptors";
import { IPassword, IUser } from "@/shared/types/user.types";
import { getUsersUrl } from "@/config/api.config";
import axios from "../api/interceptors";


export const UserService = {
	async getAccount() {
		return await axiosClassic.get<IUser>(getUsersUrl('account'))
	},
	
	async updateAccount(data: IUser) {
		return await axiosClassic.put<IUser>(getUsersUrl('account'), data)
	},
	
	async changePassword(data: IPassword) {
		return await axiosClassic.put<IUser>(getUsersUrl('change-password'), data)
	},
	
	async count(){
		return await axios.get<number>(getUsersUrl('count'))
	},
	
	async getAll(searchParam?: string) {
		return await axios.get<IUser[]>(getUsersUrl(''), {
			params: {
				searchParam
			}
		})
	},
	
	async getById(_id: string) {
		return await axios.get<IUser>(getUsersUrl(`${_id}`))
	},
	
	async updateById(_id: string, data: IUser) {
		return await axios.put<IUser>(getUsersUrl(`${_id}`), data)
	},
	
	async deleteById(_id: string) {
		return await axios.delete<IUser>(getUsersUrl(`${_id}`))
	},
	
	async getByUsername(username: string) {
		return await axios.get<IUser[]>(getUsersUrl(`by-username/${username}`))
	},
}