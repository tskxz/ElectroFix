import {configureStore} from '@reduxjs/toolkit'
import {apiSlice} from './slices/apiSlice.js'
import carrinhoSliceReducer from './slices/carrinhoSlice.js'
const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        carrinho: carrinhoSliceReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
})

export default store