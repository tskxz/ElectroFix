
import {ELETRODOMESTICOS_URL, UPLOAD_URL} from '../constants';
import {apiSlice} from './apiSlice';

export const eletrodomesticosApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getEletrodomesticos: builder.query({
            query: ({keyword, pageNumber}) => ({
                url: ELETRODOMESTICOS_URL,
                params: {
                    pageNumber,
                    keyword,
                }

            }),
            providesTags: ['Eletrodomesticos'],
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
        }),
        criarReview: builder.mutation({
            query: (data) => ({
                url: `${ELETRODOMESTICOS_URL}/${data.eletrodomesticoId}/reviews`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Eletrodomestico']
        }),

        getTopEletrodomesticos: builder.query({
            query: () => ({
                url: `${ELETRODOMESTICOS_URL}/top`
            }),
            keepUnusedDataFor : 5
        })
    })
})

export const {useGetEletrodomesticosQuery, useGetEletrodomesticoQuery, useCriarEletrodomesticoMutation, useAtualizarEletrodomesticoMutation, useUploadEletrodomesticoImagemMutation, useDeleteEletrodomesticoMutation, useCriarReviewMutation, useGetTopEletrodomesticosQuery} = eletrodomesticosApiSlice