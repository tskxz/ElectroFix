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
		},
        logout: (state, action) => {
			state.utilizadorInfo = null;
			localStorage.removeItem('utilizadorInfo');
		}
	}
})

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer