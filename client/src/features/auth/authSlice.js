import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { loginUserAPI, registerUserAPI } from './authAPI'

export const loginUser = createAsyncThunk(
	'auth/login',
	async ({ email, password }) => {
		return await loginUserAPI(email, password)
	}
)

export const registerUser = createAsyncThunk(
	'auth/register',
	async ({ username, email, password }) => {
		return await registerUserAPI(username, email, password)
	}
)

const authSlice = createSlice({
	name: 'auth',
	initialState: {
		user: null,
		status: 'idle',
		error: null
	},
	reducers: {
		logout: state => {
			state.user = null
		},
		// ?
		setUser: (state, action) => {
			state.user = action.payload
		}
	},
	extraReducers: builder => {
		builder
			.addCase(loginUser.fulfilled, (state, action) => {
				state.user = action.payload
				state.status = 'succeeded'
				state.error = null
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.error = action.error.message
				state.status = 'failed'
				state.user = null
			})
			.addCase(registerUser.fulfilled, (state, action) => {
				state.user = action.payload
				state.status = 'succeeded'
				state.error = null
			})
			.addCase(registerUser.rejected, (state, action) => {
				state.error = action.error.message
				state.status = 'failed'
				state.user = null
			})
	}
})

export const { logout, setUser } = authSlice.actions
export default authSlice.reducer
