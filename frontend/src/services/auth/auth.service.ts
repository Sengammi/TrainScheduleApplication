import { axiosClassic } from "@/api/interceptors";
import { IAuthResponse } from "@/store/user/user.interface";
import { getAuthUrl } from "@/config/api.config";
import { removeTokenStorage, saveToStorage } from "@/services/auth/auth.helper";
import Cookies from "js-cookie";
import { getContentType } from "@/api/api.helpers";


export const AuthService = {
	async signUp(username: string, email: string, password: string) {
		const response = await axiosClassic.post<IAuthResponse>(
			getAuthUrl('sign-up'),
			{username, email, password}
		)
		
		if (response.data.accessToken) {
			saveToStorage(response.data);
		}
		
		return response;
	},
	
	async signIn(email: string, password: string) {
		const response = await axiosClassic.post<IAuthResponse>(
			getAuthUrl('sign-in'),
			{email, password}
		)
		
		if (response.data.accessToken) {
			saveToStorage(response.data);
		}
		
		return response;
	},
	
	async signOut() {
		removeTokenStorage();
		localStorage.removeItem('user');
	},
	
	async getNewTokens() {
		const refreshToken = Cookies.get('refreshToken');
		const response = await axiosClassic.post<IAuthResponse>(
			getAuthUrl('sign-in/access-token'),
			{refreshToken},
			{headers: getContentType()}
		)
		
		if (response.data.accessToken) {
			saveToStorage(response.data);
		}
		
		return response;
	}
}