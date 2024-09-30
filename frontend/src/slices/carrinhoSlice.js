import {createSlice} from '@reduxjs/toolkit'
import { atualizarCarrinho } from '../utils/carrinhoUtils';
const initialState = localStorage.getItem('carrinho') ? JSON.parse(localStorage.getItem("carrinho")) : {carrinhoItens: [], enderecoPostal: {}, metodoPagamento: 'Paypal'}

const carrinhoSlice = createSlice({
    name: "carrinho",
    initialState,
    reducers: {
        adicionarToCarrinho: (state, action) => {
            const item = action.payload
            const existItem = state.carrinhoItens.find((x) => x._id === item._id)
            if(existItem){
                state.carrinhoItens = state.carrinhoItens.map((x) => x._id === existItem._id ? item: x)
            } else {
                state.carrinhoItens = [...state.carrinhoItens, item]
            }
            return atualizarCarrinho(state)

            
        },

        removerFromCarrinho: (state, action) => {
            state.carrinhoItens = state.carrinhoItens.filter((x) => x._id !== action.payload)
            return atualizarCarrinho(state)
        },

        salvarEnderecoPostal: (state, action) => {
            state.enderecoPostal = action.payload
            return atualizarCarrinho(state)
        }
    }
})

export const {adicionarToCarrinho, removerFromCarrinho, salvarEnderecoPostal} = carrinhoSlice.actions
export default carrinhoSlice.reducer