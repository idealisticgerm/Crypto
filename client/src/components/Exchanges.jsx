import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Loader from './Loader';
import { Link } from 'react-router-dom';



const Exchanges = () => {
    const [exchanges, setExchanges] = useState([])
    const options = {
        method: 'GET',
        url: 'https://coingecko.p.rapidapi.com/exchanges',
        headers: {
            'X-RapidAPI-Key': 'a58b0bcd4emshda40ab70fab2d25p18a63fjsnd8e42a3cbe50',
            'X-RapidAPI-Host': 'coingecko.p.rapidapi.com'
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.request(options);

                if (response.status === 200) {
                    setExchanges(response.data);
                    console.log(exchanges)
                }
            } catch (error) {
                console.error(`Error ${error}`);
            }

        };

        fetchData();

    }, [])


    return (
        <div className='flex flex-wrap gap-5 justify-center mt-10'>
            {exchanges.length > 0 ? (
                exchanges.map((exchange) =>
                    <Link to={exchange.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        key={exchange.id}>
                        <div
                            className="relative flex w-80 max-w-[20rem] flex-col rounded-xl bg-violet-900 bg-clip-border text-white shadow-none  border hover:bg-violet-700 hover:-translate-y-0.5"
                        >
                            <div
                                className="relative flex items-center gap-4 p-3 overflow-hidden text-white bg-transparent shadow-none rounded-xl bg-clip-border">
                                <div className="flex w-full flex-col gap-0.5">
                                    <div className="flex items-center justify-between">
                                        <h5
                                            className="block font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                                            {exchange.name}
                                        </h5>
                                        <img
                                            src={exchange.image}
                                            alt="Coin"
                                            className="relative inline-block h-[58px] w-[58px] !rounded-full  object-cover object-center" />

                                    </div>

                                </div>
                            </div>
                            {/* <hr /> */}
                            <div className="p-3 mb-6 ">
                                <p className="block font-sans text-base antialiased font-medium leading-relaxed text-inherit my-2">
                                    Rank: {exchange.trust_score_rank}
                                </p>
                                <p className="block font-sans text-base antialiased font-medium leading-relaxed text-inherit my-2">
                                    Trust Score: {exchange.trust_score}
                                </p>
                                <p className="block font-sans text-base antialiased font-medium leading-relaxed text-inherit">
                                    Year Est. : {exchange.year_established}
                                </p>
                            </div>
                        </div>
                    </Link>
                )
            ) : (
                <Loader />
            )}
        </div>
    )
}

export default Exchanges