import {apiSlice} from './apiSlice'
import {ENCOMENDAS_URL, PAYPAL_URL} from '../constants';

export const encomendasApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		criarEncomenda: builder.mutation({
			query:(encomenda) => ({
				url: ENCOMENDAS_URL,
				method: 'POST',
				body: {...encomenda}
			})
		}),
		
		getEncomendaDetails: builder.query({
            query: (encomendaId) => ({
                url: `${ENCOMENDAS_URL}/${encomendaId}`,
                method: 'GET'
            }),
			keepUnusedDataFor: 5
		}),
		pagarEncomenda: builder.mutation({
			query: ({encomendaId, details}) => ({
				url: `${ENCOMENDAS_URL}/${encomendaId}/pago`,
				method: 'PUT',
				body: {...details}
			})
		}),

		getPayPalClientId: builder.query({
			query: () => ({
				url: PAYPAL_URL,
			}),
			keepUnusedDataFor:5,
		}),
		getMinhasEncomendas: builder.query({
			query: () => ({
				url: `${ENCOMENDAS_URL}/minhasencomendas`
			}),
			keepUnusedDataFor: 5,
		})
	})
})


export const {useCriarEncomendaMutation, useGetEncomendaDetailsQuery, usePagarEncomendaMutation, useGetPayPalClientIdQuery, useGetMinhasEncomendasQuery} = encomendasApiSlice