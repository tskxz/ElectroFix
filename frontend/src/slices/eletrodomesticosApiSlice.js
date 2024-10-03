import {ELETRODOMESTICOS_URL, UPLOAD_URL} from '../constants';
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
        }),
        uploadEletrodomesticoImagem: builder.mutation({
            query: (data) => ({
                url: `${UPLOAD_URL}`,
                method: 'POST',
                body: data,
            })
        }),
        deleteEletrodomestico: builder.mutation({
            query: (eletrodomesticoId) => ({
                url: `${ELETRODOMESTICOS_URL}/${eletrodomesticoId}`,
                method: 'DELETE',
            })
        })
    }),
})

export const {useGetEletrodomesticosQuery, useGetEletrodomesticoQuery, useCriarEletrodomesticoMutation, useAtualizarEletrodomesticoMutation, useUploadEletrodomesticoImagemMutation, useDeleteEletrodomesticoMutation} = eletrodomesticosApiSlice