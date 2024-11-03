import { configureStore } from '@reduxjs/toolkit';

import auth from './auth';

const store = configureStore({
	reducer: {
		auth
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: false
		}),
	devTools: import.meta.env.MODE !== 'production'
});

export default store;
