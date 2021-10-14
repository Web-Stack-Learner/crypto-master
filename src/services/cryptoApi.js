import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoApiHeaders = {
  'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
  'x-rapidapi-key': process.env.API_KEY
};
const url = 'https://coinranking1.p.rapidapi.com';

const createRequest = url => ({ url, headers: cryptoApiHeaders });

export const cryptoApi = createApi({
  reducerPath: 'cryptoApi',
  baseQuery: fetchBaseQuery({ baseUrl: url }),
  endpoints: builder => ({
    getCryptos: builder.query({
      query: count => createRequest(`/coins?limit=${count}`)
    }),
    getCryptoDetails: builder.query({
      query: coinId => createRequest(`/coin/${coinId}`)
    }),
    getCoinHistory: builder.query({
      query: ({ coinId, timeperiod }) =>
        createRequest(`/coin/${coinId}/history/${timeperiod}`)
    }),
    getCryptoExchange: builder.query({
      query: () => createRequest('/exchanges')
    })
  })
});

export const { useGetCryptosQuery,useGetCryptoDetailsQuery,useGetCoinHistoryQuery,useGetCryptoExchangeQuery } = cryptoApi;
