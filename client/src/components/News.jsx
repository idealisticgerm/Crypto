import React from 'react'

import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi'

const News = ({ simplified }) => {

  const { data: cryptoNews } = useGetCryptoNewsQuery({ newsCategory: 'Cryptocurrency', count: simplified ? 10 : 12 })
  console.log(cryptoNews)

  if (!cryptoNews?.articles) return 'Loading....'

  return (
    <div className='m-auto flex flex-wrap gap-4 justify-center'>
      {
        cryptoNews.articles.map((news) => (
          <div
            className="relative flex w-80 max-w-[20rem] flex-col rounded-xl bg-violet-900 bg-clip-border text-white shadow-none  border hover:bg-violet-700 hover:-translate-y-0.5">
            <div
              className="relative flex items-center gap-4 p-3 overflow-hidden text-white bg-transparent shadow-none rounded-xl bg-clip-border">
              <div className="flex w-full flex-col gap-0.5">
                <div className="flex items-center justify-between">
                <img
                    src=''
                    alt="Tania Andrew"
                    className="relative inline-block h-[58px] w-[58px] !rounded-full  object-cover object-center" />
                  <h6
                    className="block font-sans text-l antialiased font-normal leading-snug tracking-normal text-blue-gray-900">
                    {news.title}
                  </h6>
                  

                </div>

              </div>
            </div>
          </div>
        ))
      }
    </div>



  )
}

export default News