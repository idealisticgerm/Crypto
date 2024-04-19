import React from 'react'

import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi'
import { Link } from 'react-router-dom';

const News = ({ simplified }) => {
  const { data: newsResponse, isLoading, isError, error } = useGetCryptoNewsQuery();

  if (isLoading) return 'Loading...';
  if (isError) return `Error: ${error.toString()}`;

  const { data: cryptoNews } = newsResponse || {};

  if (!cryptoNews || !Array.isArray(cryptoNews)) return 'No data available';
  console.log(cryptoNews)


  const limitedNews = simplified ? cryptoNews.slice(0, 8) : cryptoNews;
  return (
    <div className='mx-auto flex flex-wrap gap-4 justify-center mb-10'>
      {
        limitedNews.map((news) => (



          <div className='bg-violet-950 border rounded-xl'>
            <div className="flex flex-col max-w-md bg-violet-8  text-gray-300 px-8 py-6 rounded-xl space-y-5 items-center justify-center ">
              <img className="w-full rounded-md" src={news.thumbnail} alt="motivation" />
              <h3 className="font-serif font-semibold text-gray-200 text-lgF text-center line-clamp-2">
                {news.title}</h3>
              <span className="text-center">
                {new Date(news.createdAt).toLocaleString('en-IN', {
                  timeZone: 'Asia/Kolkata',
                  dateStyle: 'medium',
                  timeStyle: 'short',
                })}
              </span>
              <Link to={news.url}
                target="_blank"
              >
                <button className="px-24 py-4 bg-gray-500 rounded-md text-white text-sm focus:border-transparent">Read More...</button>
              </Link>
            </div>
          </div>

        ))
      }



      <style>
        {`
          .line-clamp-2 {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        `}
      </style>
    </div >



  )
}

export default News