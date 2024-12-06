import {createSlice} from '@reduxjs/toolkit'
import { atualizarAgenda } from '../utils/agendaUtils';
const initialState = localStorage.getItem('agenda') ? JSON.parse(localStorage.getItem("agenda")) : {enderecoPostal: {}, metodoPagamento: 'Paypal'}

const agendaSlice = createSlice({
    name: "agenda",
    initialState,
    reducers: {
        salvarEnderecoPostal: (state, action) => {
            state.enderecoPostal = action.payload
            return atualizarAgenda(state)
        },
        salvarMetodoPagamento: (state, action) => {
            state.metodoPagamento = action.payload;
            return atualizarAgenda(state)
        },
    }
})

export const {salvarEnderecoPostal, salvarMetodoPagamento} = agendaSlice.actions
export default agendaSlice.reducer