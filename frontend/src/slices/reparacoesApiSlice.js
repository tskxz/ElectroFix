
import {REPARACOES_URL} from '../constants';
import {apiSlice} from './apiSlice';

export const reparacoesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        criarReparacao: builder.mutation({
            query: (data) => ({
                url: REPARACOES_URL,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Reparacao']
        }),
    })
})

export const {useCriarReparacaoMutation} = reparacoesApiSlice