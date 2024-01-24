import React, { useEffect, useState } from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Input, Typography,Statistic } from 'antd';

const { Title } = Typography;

const Home = () => {
  return (
    <>
      <div className='bg-white'>
        <Title level={2} className='heading text-white'>Global Crypto Stats</Title>
        <Row gutter={[32, 32]}>
        <Col span={12}><Statistic title="Total Cryptocurrencies" value='5' /></Col>
        <Col span={12}><Statistic title="Total Exchanges" value='5' /></Col>
        <Col span={12}><Statistic title="Total Market Cap:" value='5' /></Col>
        <Col span={12}><Statistic title="Total 24h Volume" value='5' /></Col>
        <Col span={12}><Statistic title="Total Cryptocurrencies" value='5' /></Col>
        <Col span={12}><Statistic title="Total Markets" value='5'/></Col>
      </Row>

      </div>    
      </>
  )
}

export default Home