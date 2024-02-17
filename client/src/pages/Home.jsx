import React, { useEffect, useState } from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Input, Typography, Statistic } from 'antd';
import { useGetCryptosQuery } from '../services/cryptoAPI';
import { Cryptocurrencies, News, Loader } from '../components'
import homelogo from '../../images/bitcoin.svg'
// import { gsap } from "gsap";

const { Title } = Typography;

const Home = () => {
  const { data, isFetching } = useGetCryptosQuery(10);
  // console.log(data)
  const globalStats = data?.data?.stats;




  if (isFetching) return <Loader />;

  const gridStyle = 'grid grid-cols-1 md:grid-cols-2 gap-3';


  return (
    <>
      <div className=' p-5 ' >
        <div className='flex justify-center mb-6 '>
          <div className='w-[900px] h-[900px] '>
            <img src={homelogo} alt=""
              className='transit'
            />
          </div>
        </div>

        {/* <Title level={2} className='heading' style={{ color: 'white' }}>Global Crypto Stats</Title>
        <div className='pl-[100px] '>
        <Row gutter={[32, 32]} style={{ color: 'white' }}>
        <Col span={12}><Statistic title="Total Cryptocurrencies" value={globalStats.total}  /></Col>
        <Col span={12} ><Statistic title="Total Exchanges" value={millify(globalStats.totalExchanges)} /></Col>
        <Col span={12} ><Statistic title="Total Market Cap:" value={`$${millify(globalStats.totalMarketCap)}`} /></Col>
        <Col span={12} ><Statistic title="Total 24h Volume" value={`$${millify(globalStats.total24hVolume)}`} /></Col>
        <Col span={12} ><Statistic title="Total Cryptocurrencies" value={globalStats.totalCoins6} /></Col>
        <Col span={12} ><Statistic title="Total Markets" value={millify(globalStats.totalMarkets)} /></Col>
      </Row> */}
        <div className='text-white'>
          <h2 className='text-3xl font-bold mb-4'>Global Crypto Stats</h2>
          <div className={`pl-[100px] ${gridStyle}`}>
            <div className='mb-8'>
              <p className='text-xl mb-4'>Total Cryptocurrencies</p>
              <p className='text-2xl font-bold'>{globalStats.total}</p>
            </div>
            <div className='mb-8'>
              <p className='text-xl mb-4'>Total Exchanges</p>
              <p className='text-2xl font-bold'>{millify(globalStats.totalExchanges)}</p>
            </div>
            <div className='mb-8'>
              <p className='text-xl mb-4'>Total Market Cap</p>
              <p className='text-2xl font-bold'>${millify(globalStats.totalMarketCap)}</p>
            </div>
            <div className='mb-8'>
              <p className='text-xl mb-4'>Total 24h Volume</p>
              <p className='text-2xl font-bold'>${millify(globalStats.total24hVolume)}</p>
            </div>
            <div className='mb-8'>
              <p className='text-xl mb-4'>Total Cryptocurrencies</p>
              <p className='text-2xl font-bold'>{globalStats.totalCoins}</p>
            </div>
            <div className='mb-8'>
              <p className='text-xl mb-4'>Total Markets</p>
              <p className='text-2xl font-bold'>{millify(globalStats.totalMarkets)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="home-heading-container flex justify-between  items-center m-5 p-3 text-white">
        <p className='text-3xl font-semibold'>Top 10 Cryptos In The World</p>
        <p className='text-2xl font-semibold text-teal-300'><Link to="/cryptocurrencies" >Show more</Link></p>
      </div>

      <Cryptocurrencies simplified />

      <div className="home-heading-container flex justify-between  items-center my-16 p-3 text-white">
        <p className='text-3xl font-semibold'>Latest Crypto News</p>
        <p className='text-2xl font-semibold text-teal-300'><Link to="/cryptocurrencies" >Show more</Link></p>
      </div>

      <News simplified />


    </>
  )
}

export default Home