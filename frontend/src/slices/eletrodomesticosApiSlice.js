import {ELETRODOMESTICOS_URL} from '../constants';
import {apiSlice} from './apiSlice';

export const eletrodomesticosApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getEletrodomesticos: builder.query({
            query: () => ({
                url: ELETRODOMESTICOS_URL,

            }),
            keepUnusedDataFor: 5,
        }),

        getEletrodomestico: builder.query({
            query: (eletrodomesticoId) => ({
                url: `${ELETRODOMESTICOS_URL}/${eletrodomesticoId}`
            }),
            keepUnusedDataFor: 5
        }),
        criarEletrodomestico: builder.mutation({
            query: () => ({
                url: ELETRODOMESTICOS_URL,
                method: 'POST'
            }),
            invalidatesTags: ['Eletrodomestico']
        }),
        atualizarEletrodomestico: builder.mutation({
            query: (data) => ({
                url: `${ELETRODOMESTICOS_URL}/${data.eletrodomesticoId}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Eletrodomesticos']
        })
    }),
})

export const {useGetEletrodomesticosQuery, useGetEletrodomesticoQuery, useCriarEletrodomesticoMutation, useAtualizarEletrodomesticoMutation} = eletrodomesticosApiSlice