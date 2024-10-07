import {UTILIZADORES_URL} from '../constants.js'
import {apiSlice} from './apiSlice.js'

export const utilizadoresApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${UTILIZADORES_URL}/login`,
                method: 'POST',
                body: data,
            }),
            keepUnusedDataFor: 5,
        }),

        logout: builder.mutation({
            query: () => ({
                url: `${UTILIZADORES_URL}/logout`,
                method: 'POST',
            }),
        }),

        register: builder.mutation({
            query: (data) => ({
                url: `${UTILIZADORES_URL}`,
                method: 'POST',
                body: data,
            }),
        }),
        perfil: builder.mutation({
            query: (data) => ({
                url: `${UTILIZADORES_URL}/perfil`,
                method: 'PUT',
                body: data,
            })
        }),
        getUtilizadores: builder.query({
            query: (data) => ({
                url: UTILIZADORES_URL,
            }),
            providesTags: ['Utilizadores'],
            keepUnusedDataFor: 5
        }),

        deleteUtilizador: builder.mutation({
            query: (utilizadorId) => ({
                url: `${UTILIZADORES_URL}/${utilizadorId}`,
                method: 'DELETE'
            })
        }),

        getUtilizador: builder.query({
            query: (utilizadorId) => ({
                url:`${UTILIZADORES_URL}/${utilizadorId}`,
            }),
            keepUnusedDataFor: 5,
        }),

        atualizarUtilizador: builder.mutation({
            query: (data) => ({
                url: `${UTILIZADORES_URL}/${data.utilizadorId}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Utilizadores']
        })
    })
})

export const { useLoginMutation, useLogoutMutation, useRegisterMutation, usePerfilMutation, useGetUtilizadoresQuery, useDeleteUtilizadorMutation, useGetUtilizadorQuery, useAtualizarUtilizadorMutation } = utilizadoresApiSlice