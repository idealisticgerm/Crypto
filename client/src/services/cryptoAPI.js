// const options = {
//     method: 'GET',
//     url: 'https://coinranking1.p.rapidapi.com/coins',
//     params: {
//       referenceCurrencyUuid: 'yhjMzLPhuIDl',
//       timePeriod: '24h',
//       'tiers[0]': '1',
//       orderBy: 'marketCap',
//       orderDirection: 'desc',
//       limit: '50',
//       offset: '0'
//     },
//     headers: {
//       'X-RapidAPI-Key': 'a58b0bcd4emshda40ab70fab2d25p18a63fjsnd8e42a3cbe50',
//       'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
//     }
//   };

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const cryptoAPIHeaders = {
  'X-RapidAPI-Key': 'a58b0bcd4emshda40ab70fab2d25p18a63fjsnd8e42a3cbe50',
  'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
}

const baseUrl = 'https://coinranking1.p.rapidapi.com';
const createRequest = (url)=>({url,headers:cryptoAPIHeaders})



export const cryptoAPI = createApi({
      reducerPath:'cryptoAPI',
      baseQuery:fetchBaseQuery({baseUrl}),
      endpoints:(builder) => ({
        getCryptos : builder.query({
          query:(count)=> createRequest(`/coins?limit=${count}`)
        })
      })
});

export const { useGetCryptosQuery }= cryptoAPI;
