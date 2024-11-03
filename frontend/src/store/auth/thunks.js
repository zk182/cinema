import { createAsyncThunk } from '@reduxjs/toolkit';
import authModel from '@/models/auth';
import userModel from '@/models/user';

export const fetchMe = createAsyncThunk(
	'auth/me',
	async (_, { rejectWithValue }) => {
		try {
			const response = await userModel.me();

			return response;
		} catch (error) {
			if (error instanceof Response) {
				return rejectWithValue({ status: error.status, data: error.data });
			}
			throw error;
		}
	}
);

export const fetchBillingInfo = createAsyncThunk(
	'customAuth/fetchBillingInfo',
	async (_, { rejectWithValue }) => {
		try {
			const response = await userModel.getBillingInfo();

			return response;
		} catch (error) {
			if (error instanceof Response) {
				return rejectWithValue({ status: error.status, data: error.data });
			}
			throw error;
		}
	}
);

export const login = createAsyncThunk(
	'auth/login',
	async (payload, { rejectWithValue }) => {
		try {
			const response = await authModel.login(payload);

			return response;
		} catch (error) {
			if (error instanceof Response) {
				return rejectWithValue({ status: error.status, data: error.data });
			}

			throw error;
		}
	}
);

export const logout = createAsyncThunk('auth/logout', async () => {
	const response = await authModel.logout();

	localStorage.removeItem('user');

	return response;
});

export const signUp = createAsyncThunk(
	'auth/signUp',
	async (payload, { rejectWithValue }) => {
		try {
			const response = await userModel.create(payload);

			return response;
		} catch (error) {
			if (error instanceof Response) {
				return rejectWithValue({ status: error.status, data: error.data });
			}

			throw error;
		}
	}
);
