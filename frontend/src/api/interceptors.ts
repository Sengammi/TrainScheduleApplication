import axios from 'axios';
import { IS_PRODUCTION } from "@/config/constants";
import { API_SERVER_URL, API_URL } from "@/config/api.config";
import { errorCatch, getContentType } from "@/api/api.helpers";
import Cookies from 'js-cookie'

export const axiosClassic = axios.create({
	baseURL: IS_PRODUCTION ? API_SERVER_URL : API_URL,
	headers: getContentType(),
})

export const instance = axios.create({
	baseURL: API_URL,
	headers: getContentType(),
})

instance.interceptors.request.use((config) => {
	const accessToken = Cookies.get('accessToken');
	
	if (config.headers && accessToken) {
		config.headers.Authorization = `Bearer ${accessToken}`;
	}
	
	return config;
})

instance.interceptors.response.use((config) => config,
	async (error) => {
		const originalRequest = error.config;
		
		if ((error.response.status === 401 || errorCatch(error) === 'jwt expired' || errorCatch(error) === 'jwt must be provided') && error.config && !error.config._isRetry) {
			originalRequest.isRetry = true;
			try {
				// todo: get new tokens
				return instance.request(originalRequest)
			} catch (error) {
				if (errorCatch(error) === 'jwt expired') {
					// todo: remove token storage
				}
			}
		}
	}
)

export default instance;