"use client";

import RaffleCard from "@components/RaffleCard";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from 'react';

const RafflePage = () => {
  const [luckyNumber, setLuckyNumber] = useState(0);
  const [raffle, setRaffle] = useState(null);
  const pathName = usePathname();

  const extractIdFromURL = () => {
    const parts = pathName.split('/');
    return parts[parts.length - 1];
  };

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
        <div className="prompt_layout ml-10">
          {raffle && (
            <RaffleCard
              key={raffle._id}
              raffle={raffle}
              onRaffleCardUpdate={fetchRaffle}
            />
          )}
        </div>
      
      
    </div>
  )
}

export default RafflePage;
