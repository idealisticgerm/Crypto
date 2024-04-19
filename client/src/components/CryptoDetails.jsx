import React, { useState } from 'react';
import HTMLReactParser from 'html-react-parser';
import { useParams } from 'react-router-dom';
import millify from 'millify';
import { Col, Row, Typography, Select } from 'antd';
import { useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } from '../services/cryptoAPI'
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons';
import Loader from './Loader';
import LineChart from './LineChart';


const { Title, Text } = Typography;
const { Option } = Select;

const CryptoDetails = () => {
    const { coinId } = useParams();
    const [timeperiod, setTimePeriod] = useState('7d');
    const { data, isFetching } = useGetCryptoDetailsQuery(coinId);
    const { data: coinHistory } = useGetCryptoHistoryQuery({ coinId, timeperiod });
    const cryptoDetails = data?.data?.coin;
    console.log(data)

    if (isFetching) return <Loader />;

    const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];

    const stats = [
        { title: 'Price to USD', value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`, icon: <DollarCircleOutlined /> },
        { title: 'Rank', value: cryptoDetails?.rank, icon: <NumberOutlined /> },
        { title: '24h Volume', value: `$ ${cryptoDetails?.volume && millify(cryptoDetails?.volume)}`, icon: <ThunderboltOutlined /> },
        { title: 'Market Cap', value: `$ ${cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)}`, icon: <DollarCircleOutlined /> },
        { title: 'All-time-high(daily avg.)', value: `$ ${cryptoDetails?.allTimeHigh?.price && millify(cryptoDetails?.allTimeHigh?.price)}`, icon: <TrophyOutlined /> },
    ];

    const genericStats = [
        { title: 'Number Of Markets', value: cryptoDetails?.numberOfMarkets, icon: <FundOutlined /> },
        { title: 'Number Of Exchanges', value: cryptoDetails?.numberOfExchanges, icon: <MoneyCollectOutlined /> },
        { title: 'Aprroved Supply', value: cryptoDetails?.supply?.confirmed ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
        { title: 'Total Supply', value: `$ ${cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)}`, icon: <ExclamationCircleOutlined /> },
        { title: 'Circulating Supply', value: `$ ${cryptoDetails?.supply?.circulating && millify(cryptoDetails?.supply?.circulating)}`, icon: <ExclamationCircleOutlined /> },
    ];
    return (
        <>
            <div className='bg-slate-100'>
                <Col className="coin-detail-container">
                    <Col className="coin-heading-container">
                        <Title level={1} className="coin-name">
                            {data?.data?.coin.name} ({data?.data?.coin.symbol}) Price
                        </Title>
                        <p>{data?.data?.coin.name} live price in US Dollar (USD). View value statistics, market cap and supply.</p>
                    </Col>
                    <Select defaultValue="7d" className="select-timeperiod" placeholder="Select Timeperiod" onChange={(value) => setTimePeriod(value)}>
                        {time.map((date) => <Option key={date}>{date}</Option>)}
                    </Select>
                    <LineChart coinHistory={coinHistory} currentPrice={millify(cryptoDetails?.price)} coinName={cryptoDetails?.name} />
                    <Col className="stats-container">
                        < Col className="coin-value-statistics">
                            <Col className="coin-value-statistics-heading">
                                <Title level={3} className="coin-details-heading">{data?.data?.coin.name} Value Statistics</Title>
                                <p>An overview showing the statistics of {data?.data?.coin.name}, such as the base and quote currency, the rank, and trading volume.</p>
                            </Col>
                            {stats.map(({ icon, title, value }) => (
                                <Col className="coin-stats">
                                    <Col className="coin-stats-name">
                                        <Text>{icon}</Text>
                                        <Text>{title}</Text>
                                    </Col>
                                    <Text className="stats">{value}</Text>
                                </Col>
                            ))}
                        </Col>
                        <Col className="other-stats-info">
                            <Col className="coin-value-statistics-heading">
                                <Title level={3} className="coin-details-heading">Other Stats Info</Title>
                                <p>An overview showing the statistics of {cryptoDetails.name}, such as the base and quote currency, the rank, and trading volume.</p>
                            </Col>
                            {genericStats.map(({ icon, title, value }) => (
                                <Col className="coin-stats">
                                    <Col className="coin-stats-name">
                                        <Text>{icon}</Text>
                                        <Text>{title}</Text>
                                    </Col>
                                    <Text className="stats">{value}</Text>
                                </Col>
                            ))}
                        </Col>
                    </Col>
                    <Col className="coin-desc-link">
                        <Row className="coin-desc flex-col text-xl">
                            <Title level={3} className="coin-details-heading">What is {cryptoDetails.name}?</Title>
                            {HTMLReactParser(cryptoDetails.description)}

                        </Row>
                        <Col className="coin-links">
                            <Title level={3} className="coin-details-heading">{cryptoDetails.name} Links</Title>
                            {cryptoDetails.links?.map((link) => (
                                <Row className="coin-link" key={link.uuid}>
                                    <Title level={5} className="link-name">{link.type}</Title>
                                    <a href={link.url} target="_blank" rel="noreferrer">{link.name}</a>
                                </Row>
                            ))}
                        </Col>
                    </Col>
                </Col >
            </div>




        </>
    )
}

export default CryptoDetails





/* <div className="box">
            <h1 className='text-white'>{data?.data?.coin.name} ({data?.data?.coin.symbol}) Price</h1>

            {/* Timeperiod selection *
            <div className="select">
                <form className="max-w-xs mx-auto">
                    <label htmlFor="timeperiod" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Select Timeperiod
                    </label>
                    <select
                        id="timeperiod"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        defaultValue="7d"
                        onChange={(e) => setTimePeriod(e.target.value)}
                    >
                        {time.map((date) => (
                            <option key={date} value={date}>
                                {date}
                            </option>
                        ))}
                    </select>
                </form>
            </div>





        </div> */