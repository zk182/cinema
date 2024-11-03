import { createSlice } from '@reduxjs/toolkit';
import { storage } from '@/utils/browser';
import i18n from '@/i18next';
import { getPathLanguage } from '@/utils';

import * as thunks from './thunks';
import {
	handleAsyncThunkActionState,
	initialAsyncState,
	isAsyncThunkActionWithPrefix
} from '../utils';

const USER_KEY = 'user';

export const AUTH_MODAL_TYPES = {
	LOGIN: 'login',
	SIGN_UP: 'signUp',
	RECOVER_PASSWORD: 'recoverPassword',
	CHANGE_PASSWORD: 'changePassword'
};

const user = storage.get(USER_KEY);

const initialState = {
	loggedIn: !!user,
	login: initialAsyncState,
	me: initialAsyncState,
	signUp: initialAsyncState,
	planName: '',
	// paymentInfo: {},
	// subscriptionInfo: {},
	language: i18n.language,
	// legalsReady: false,
	// currency: localStorage.getItem('currency') || '',
	authModalType: '',
	authModalRedirect: null,
	user
};

const authSlice = createSlice(
	{
		name: 'auth',
		initialState,
		reducers: {
			clearAuthModalData(state) {
				return {
					...state,
					login: initialAsyncState,
					signUp: initialAsyncState,
					authModalRedirect: null
				};
			},
			clearMe(state) {
				state.me = initialAsyncState;
			},
			setPaymentMethod(state, action) {
				state.paymentInfo = action.payload;
			},
			setCurrency(state, action) {
				localStorage.setItem('currency', action.payload);
				state.currency = action.payload;
			},
			setAuthModalType(state, action) {
				state.authModalType = action.payload;
			},
			setAuthModalRedirect(state, action) {
				state.authModalRedirect = action.payload;
			},
			closeAuthModal(state) {
				state.authModalType = '';
			},
			setLanguage(state, action) {
				state.language = action.payload;
			},
			setLegalsReady(state, { payload = true }) {
				state.legalsReady = payload;
			}
		},
		extraReducers(builder) {
			builder.addCase(thunks.fetchMe.fulfilled, (state, action) => {
				state.user = action.payload;
				storage.save(USER_KEY, action.payload);
				state.loggedIn = true;

				if (action.payload.currency) {
					state.currency = action.payload.currency;
				}

				if (action.payload.language && !getPathLanguage()) {
					state.language = action.payload.language;
				}
			});

			builder.addCase(thunks.fetchMe.rejected, state => {
				state.user = null;
				state.loggedIn = false;
				window.localStorage.removeItem(USER_KEY);
			});

			builder.addCase(thunks.login.fulfilled, (state, action) => {
				state.user = action.payload || {};
			});

			builder.addCase(thunks.logout.fulfilled, state => {
				state.user = null;
				state.loggedIn = false;
				state.me = initialAsyncState;
			});

			// builder.addCase(thunks.fetchCurrencies.fulfilled, (state, action) => {
			// 	state.currencies = action.payload;
			// });

			// builder.addCase(thunks.fetchBillingInfo.fulfilled, (state, action) => {
			// 	state.planName = action.payload.planName;
			// 	state.paymentInfo = action.payload.paymentInfo;
			// 	state.subscriptionInfo = action.payload.subscriptionInfo;

			// 	if (action.payload.subscriptionInfo?.status) {
			// 		state.user.subscriptionStatus =
			// 			action.payload.subscriptionInfo.status;
			// 	}
			// });

			builder.addMatcher(
				isAsyncThunkActionWithPrefix('auth'),
				handleAsyncThunkActionState
			);
		}
	},
	initialState
);

export const {
	setPaymentMethod,
	setCurrency,
	setAuthModalType,
	closeAuthModal,
	clearAuthModalData,
	setAuthModalRedirect,
	clearMe,
	setLanguage,
	setLegalsReady
} = authSlice.actions;

export default authSlice.reducer;
