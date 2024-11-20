import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithErrorHandling } from "../../app/api/baseApi";

export const errorApi = createApi({
    reducerPath: 'errorApi',
    baseQuery: baseQueryWithErrorHandling,
    endpoints: (builder) => ({
        get400Error: builder.query<void, void>({
            query: () => ({url: 'buggy/bad-request'})
        }),
        get401Error: builder.query<void, void>({
            query: () => ({url: 'buggy/unauthorized'})
        }),
        get404Error: builder.query<void, void>({
            query: () => ({url: 'buggy/not-found'})
        }),
        get500Error: builder.query<void, void>({
            query: () => ({url: 'buggy/server-error'})
        }),
        getValidationError: builder.query<void, void>({
            query: () => ({url: 'buggy/validation-error'})
        }),
    })
});

export const {
    useLazyGet400ErrorQuery,
    useLazyGet401ErrorQuery,
    useLazyGet500ErrorQuery,
    useLazyGet404ErrorQuery,
    useLazyGetValidationErrorQuery
} = errorApi;