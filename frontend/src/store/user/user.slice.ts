import { IInitialState } from "@/store/user/user.interface";
import { getStoreLocal } from "@/utils/local-storage";
import { createSlice } from "@reduxjs/toolkit";
import { checkAuth, signIn, signUp, signOut } from '@/store/user/user.actions';

const initialState: IInitialState = {
	isLoading: false,
	user: getStoreLocal('user')
}

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(signUp.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(signUp.fulfilled, (state, {payload}) => {
				state.isLoading = false;
				state.user = payload.user;
			})
			.addCase(signUp.rejected, (state) => {
				state.isLoading = true;
				state.user = null;
			})
			.addCase(signIn.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(signIn.fulfilled, (state, {payload}) => {
				state.isLoading = false;
				state.user = payload.user;
			})
			.addCase(signIn.rejected, (state) => {
				state.isLoading = true;
				state.user = null;
			})
			.addCase(signOut.fulfilled, (state) => {
				state.isLoading = false;
				state.user = null;
			})
			.addCase(checkAuth.fulfilled, (state, {payload}) => {
				state.isLoading = false;
				state.user = payload.user;
			})
	}
})

export const { reducer } = userSlice