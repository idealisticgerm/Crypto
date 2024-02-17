import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const cryptoNewsHeaders = {
//   'X-RapidAPI-Key': 'a58b0bcd4emshda40ab70fab2d25p18a63fjsnd8e42a3cbe50',
//     'X-RapidAPI-Host': 'news-api14.p.rapidapi.com'

// };

const baseUrl = "https://newsapi.org/v2";

const createRequest = (url) => ({ url });

export const cryptoNewsApi = createApi({
  reducerPath: "cryptoNewsApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: ({ newsCategory, count }) =>
        createRequest(
          "/top-headlines?q=bitcoin&apiKey=1005fc83b08e41238b53605a0f5bc052"
        ),
    }),
  }),
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;
