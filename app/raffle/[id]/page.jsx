"use client";

import CustomWheel from "@components/CustomWheel";
import RaffleCard from "@components/RaffleCard";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from 'react';




const RafflePage = () => {
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [luckyNumber, setLuckyNumber] = useState(0);
  const [raffle, setRaffle] = useState(null);
  const pathName = usePathname();

  const extractIdFromURL = () => {
    const parts = pathName.split('/');
    return parts[parts.length - 1];
  };

  const data = [
    { option: 'REACT 0' },
    { option: 'CUSTOM' },
    { option: 'ROULETTE', style: { textColor: '#f9dd50' } },
    { option: 'WHEEL' },
    { option: 'REACT' },
    { option: 'CUSTOM' },
    { option: 'ROULETTE', style: { textColor: '#70bbe0' } },
    { option: 'WHEEL' },
  ];
  const fetchRaffle = async () => {
    const id = extractIdFromURL();
    const response = await fetch(`/api/raffles/${id}`);
    const {response_data} = await response.json();
    setRaffle(await response_data);


  };

  useEffect(() => {
    fetchRaffle();
  }, []);

  return (
    <div>
      <section className="bg-orange-600 flex-center flex-col w-screen p-8">
            <h1 className=" text-white head_text text-center py-4 ">Welcome to the Raffle Page</h1>
            <p className="desc text-center">Enter Raffle and live track the results of the raffle </p>
      </section>
      <div className="flex-center">
        <div className="prompt_layout">
          {raffle && (
            <RaffleCard
              key={raffle._id}
              raffle={raffle}
              onRaffleCardUpdate={fetchRaffle}
            />
          )}
        <div className="">
        <CustomWheel 
          iPrizeNumber={prizeNumber}
          data = {data}
          setWinningNumber={(e) => setPrizeNumber(e.value)}
        />
        </div>
        </div>
      </div>
      
      
    </div>
  )
}

export default RafflePage;
