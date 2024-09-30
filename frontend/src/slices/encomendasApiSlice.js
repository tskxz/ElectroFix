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
		})
	})
})


export const {useCriarEncomendaMutation} = encomendasApiSlice