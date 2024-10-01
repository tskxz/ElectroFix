import {apiSlice} from './apiSlice'
import {ENCOMENDAS_URL} from '../constants';

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
		})
	})
})


export const {useCriarEncomendaMutation, useGetEncomendaDetailsQuery} = encomendasApiSlice