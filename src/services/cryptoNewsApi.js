import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoApiHeaders={
    'x-bingapis-sdk': 'true',
    'x-rapidapi-host': 'bing-news-search1.p.rapidapi.com',
    'x-rapidapi-key': '194f789e10msh584dfead32dcf38p1d0a30jsnc411737108ce'
}
  const createRequest=(url)=>({url,headers:cryptoApiHeaders})
const url = 'https://bing-news-search1.p.rapidapi.com';
export const cryptoNewsApi = createApi({
  reducerPath: 'cryptoNewsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: url
  }),
  endpoints: builder => ({
    getCryptoNews: builder.query({
      query: ({ newsCategory, count }) =>
        createRequest(
          `/news/search?q=${newsCategory}&safeSeacrh=Off&textFormat=raw&freshness=Day&count=${count}`
        )
    })
  })
});

export const {useGetCryptoNewsQuery}= cryptoNewsApi