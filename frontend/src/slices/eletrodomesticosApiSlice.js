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
        })
    }),
})

export const {useGetEletrodomesticosQuery, useGetEletrodomesticoQuery} = eletrodomesticosApiSlice