import { createAsyncThunk } from "@reduxjs/toolkit";
import { IAuthResponse, IEmailPassword, IEmailPasswordName } from "@/store/user/user.interface";
import { AuthService } from "@/services/auth/auth.service";
import { toastr } from "react-redux-toastr";
import { toastError } from "@/utils/toast-error";
import { errorCatch } from "@/api/api.helpers";


export const signUp = createAsyncThunk<IAuthResponse, IEmailPasswordName>('auth/sign-up', async ({username, email, password}, thunkAPI) => {
	try {
		const response = await AuthService.signUp(username, email, password);
		toastr.success('Sign Up', "Complete successfully");
		return response.data;
	} catch (error) {
		toastError(error);
		return thunkAPI.rejectWithValue(error);
	}
});

export const signIn = createAsyncThunk<IAuthResponse, IEmailPassword>('auth/sign-in', async ({email, password}, thunkAPI) => {
	try {
		const response = await AuthService.signIn(email, password);
		toastr.success('Sing In', "Complete successfully");
		return response.data;
	} catch (error) {
		toastError(error);
		return thunkAPI.rejectWithValue(error)
	}
})

export const singOut = createAsyncThunk('auth/sing-out', async () => {
	await AuthService.singOut()
})

export const checkAuth = createAsyncThunk<IAuthResponse>('auth/sign-in/access-token', async (_, thunkAPI) => {
	try {
		const response = await AuthService.getNewTokens();
		return response.data;
	} catch (error) {
		if (errorCatch(error) === 'jwt expired') {
			toastr.error('Sign Out', 'Your authentication is finished, sign in again.')
		}
		toastError(error)
		return thunkAPI.rejectWithValue(error)
	}
})