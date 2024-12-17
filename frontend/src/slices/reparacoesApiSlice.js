
import {REPARACOES_URL, PAYPAL_URL} from '../constants';
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
        getReparacaoDetails: builder.query({
            query: (reparacaoId) => ({
                url: `${REPARACOES_URL}/${reparacaoId}`,
                method: 'GET'
            }),
			keepUnusedDataFor: 5
		}),
        getPayPalClientId: builder.query({
			query: () => ({
				url: PAYPAL_URL,
			}),
			keepUnusedDataFor:5,
		}),
        recusarReparacao: builder.mutation({
			query: (reparacaoId) => ({
				url: `${REPARACOES_URL}/${reparacaoId}/recusado`,
				method: 'PUT',
			})
		}),
        getTodasReparacoes: builder.query({
            query: () => ({
				url:`${REPARACOES_URL}/todasreparacoes`
			}),
			keepUnusedDataFor: 5,
		}),
        pagarReparacao: builder.mutation({
			query: ({reparacaoId, details}) => ({
				url: `${REPARACOES_URL}/${reparacaoId}/pago`,
				method: 'PUT',
				body: {...details}
			})
		}),

    })
})

export const {useCriarReparacaoMutation, usePagarReparacaoMutation, useGetReparacaoDetailsQuery,useGetPayPalClientIdQuery, useRecusarReparacaoMutation, useGetTodasReparacoesQuery} = reparacoesApiSlice