import {createSlice} from '@reduxjs/toolkit';

const initialState = {
	utilizadorInfo: localStorage.getItem('utilizadorInfo') ? JSON.parse(localStorage.getItem('utilizadorInfo')) : null,
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setCredentials: (state, action) => {
			state.utilizadorInfo = action.payload
			localStorage.setItem('utilizadorInfo', JSON.stringify(action.payload));
		}
	}
})

export const { setCredentials } = authSlice.actions;

export default authSlice.reducer