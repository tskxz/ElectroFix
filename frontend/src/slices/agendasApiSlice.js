import {apiSlice} from './apiSlice'
import {AGENDAS_URL, PAYPAL_URL} from '../constants';

export const agendasApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		criarAgenda: builder.mutation({
			query:(agenda) => ({
				url: AGENDAS_URL,
				method: 'POST',
				body: {...agenda}
			})
		}),
		
		getAgendaDetails: builder.query({
            query: (agendaId) => ({
                url: `${AGENDAS_URL}/${agendaId}`,
                method: 'GET'
            }),
			keepUnusedDataFor: 5
		}),
		pagarAgenda: builder.mutation({
			query: ({agendaId, details}) => ({
				url: `${AGENDAS_URL}/${agendaId}/pago`,
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
		getMinhasAgendas: builder.query({
			query: () => ({
				url: `${AGENDAS_URL}/minhasagendas`
			}),
			keepUnusedDataFor: 5,
		}),
		getTodasAgendas: builder.query({
            query: () => ({
				url:`${AGENDAS_URL}/todasagendas`
			}),
			keepUnusedDataFor: 5,
		}),
		getAgendas: builder.query({
			query: () => ({
				url: AGENDAS_URL,
			}),
			keepUnusedDataFor: 5,
		}),
		confirmarAgenda: builder.mutation({
			query: (agendaId) => ({
				url: `${AGENDAS_URL}/${agendaId}/confirmado`,
				method: 'PUT',
			})
		}),
		recusarAgenda: builder.mutation({
			query: (agendaId) => ({
				url: `${AGENDAS_URL}/${agendaId}/recusado`,
				method: 'PUT',
			})
		}),

		atualizarAgenda: builder.mutation({
			query: (data) => ({
                url: `${AGENDAS_URL}/${data.agendaId}/mudar_data`,
                method: 'PUT',
				body: data,
            }),
			invalidatesTags: ['Agendas']
		})
	})
})


export const {useCriarAgendaMutation, useGetAgendaDetailsQuery, usePagarAgendaMutation, useGetPayPalClientIdQuery, useGetMinhasAgendasQuery, useGetAgendasQuery, useConfirmarAgendaMutation, useRecusarAgendaMutation, useGetTodasAgendasQuery, useAtualizarAgendaMutation} = agendasApiSlice