import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// initialize an empty api service that we'll inject endpoints into later as needed
export const blogApi = createApi({
  reducerPath: 'blogApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_API_URL+"/api"}),
  // global configuration for the api time cache kept with zero subscriptions default = 60
  keepUnusedDataFor: 30,
  tagTypes: ['Posts','User'],
  endpoints: () => ({}),
})