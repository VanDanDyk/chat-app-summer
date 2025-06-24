import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../featuers/auth/authSlice.js'
import chatReducer from '../features/chat/chatSlice.js'

export const store = configureStore({
	reducer: {
		auth: authReducer,
		chat: chatReducer
	}
})
