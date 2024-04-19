import React, { useEffect, useState } from 'react'
import millify from 'millify';
import { Link } from 'react-router-dom';
// import { Card, Row, Col, Input } from 'antd'
// import { Link } from 'react-router-dom'

import { useGetCryptosQuery } from '../services/cryptoAPI';
import Loader from './Loader';


const Cryptocurrencies = ({ simplified }) => {
    const count = simplified ? 10 : 100;
    const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
    const [cryptos, setCryptos] = useState(cryptosList?.data?.coins);
    const [searchTerm, setSearchTerm] = useState('');


    useEffect(() => {
        setCryptos(cryptosList?.data?.coins);

        const filteredData = cryptosList?.data?.coins.filter((item) => item.name.toLowerCase().includes(searchTerm));

        setCryptos(filteredData);
    }, [cryptosList, searchTerm]);
    // console.log(cryptos)

    useEffect(() => {
        const fetchCoins = async () => {
            const { coins } = await axios.get(
                "https://api.coingecko.com/api/v3/coins/list"
            );
            console.log(coins);
        };

        fetchCoins();
    }, [])


    if (isFetching) return <Loader />

    return (

        <>

            <div className="search-crypto flex justify-center mt-10">

                {!simplified && (<div class="relative mb-3" data-te-input-wrapper-init>
                    <input
                        type="text"
                        class="peer block min-h-[auto] w-[500px] rounded border-1 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                        id="exampleFormControlInput1"
                        placeholder="Example label"
                        onChange={(e) => setSearchTerm(e.target.value.toLowerCase())} />
                    <label
                        for="exampleFormControlInput1"
                        class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                    > Search Cryptos
                    </label>
                </div>)}
            </div>

            <div className='flex flex-wrap gap-5 justify-center my-3'>

                {cryptos?.map((currency) => (
                    <Link key={currency.uuid} to={`/crypto/${currency.uuid}`}>
                        <div
                            className="relative flex w-80 max-w-[20rem] flex-col rounded-xl bg-violet-900 bg-clip-border text-gray-300 shadow-none  border hover:bg-violet-700 hover:-translate-y-0.5">
                            <div
                                className="relative flex items-center gap-4 p-3 overflow-hidden text-gray-200 bg-transparent shadow-none rounded-xl bg-clip-border">
                                <div className="flex w-full flex-col gap-0.5">
                                    <div className="flex items-center justify-between">
                                        <h5
                                            className="block font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                                            {`${currency.rank}. ${currency.name}`}
                                        </h5>
                                        <img
                                            src={currency.iconUrl}
                                            alt="Coin"
                                            className="relative inline-block h-[58px] w-[58px] !rounded-full  object-cover object-center" />

                                    </div>

                                </div>
                            </div>
                            {/* <hr /> */}
                            <div className="p-3 mb-6 ">
                                <p className="block font-sans text-base antialiased font-medium leading-relaxed text-inherit my-2">
                                    Price: $ {millify(currency.price)}
                                </p>
                                <p className="block font-sans text-base antialiased font-medium leading-relaxed text-inherit my-2">
                                    MarketCap: $ {millify(currency.marketCap)}
                                </p>
                                <p className="block font-sans text-base antialiased font-medium leading-relaxed text-inherit">
                                    DailyChange: {currency.change}%
                                </p>
                            </div>
                        </div>
                    </Link>
                ))}

            </div>

        </>

    )

}

export default Cryptocurrencies;


import axios from "axios";




//     <>
//          <Row gutter={[30,30]} classNameName="crypto-card-container">
//     {cryptos?.map((currency) => (
//       <Col
//         xs={24}
//         sm={12}
//         lg={6}
//         classNameName="crypto-card"
//         key={currency.uuid}
//       >

//         {/* Note: Change currency.id to currency.uuid  */}
//         <Link key={currency.uuid} to={`/crypto/${currency.uuid}`}>
//           <Card
//             title={`${currency.rank}. ${currency.name}`}
//             extra={<img classNameName="crypto-image" src={currency.iconUrl} />}
//             hoverable
//           >
//             <p>Price: {millify(currency.price)}</p>
//             <p>Market Cap: {millify(currency.marketCap)}</p>
//             <p>Daily Change: {currency.change}%</p>
//           </Card>
//         </Link>
//       </Col>
//     ))}
//   </Row>
//     </>