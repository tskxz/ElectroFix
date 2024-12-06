// TODO: Adicionar slice agenda

import {configureStore} from '@reduxjs/toolkit'
import {apiSlice} from './slices/apiSlice.js'
import agendaSliceReducer from './slices/agendaSlice.js'

import carrinhoSliceReducer from './slices/carrinhoSlice.js'
import authSliceReducer from './slices/authSlice.js'
const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        carrinho: carrinhoSliceReducer,
        agenda: agendaSliceReducer,
        auth: authSliceReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
})

export default store