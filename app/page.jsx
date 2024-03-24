"use client";

import Raffles from '@components/Raffles';
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import RecentWinners from '@components/RecentWinners';
export const dynamic = 'force-dynamic'



const Home = () => {
  const [allRaffles, setAllRaffles] = useState([]);
  const { data: session } = useSession();


  const fetchRaffles = async () => {
    const response = await fetch("/api/raffles", {
      method: "GET", // Specify the HTTP method
      headers: {
        "Content-Type": "application/json", // Specify any headers you need
        // Add any additional headers as needed
      },
      // You can include additional options such as body for POST requests, etc.
    });
    const data = await response.json();
    setAllRaffles(data);
  };

  useEffect(() => {
    fetchRaffles();
    const intervalId = setInterval(fetchRaffles, 10000  );
     
      return () => clearInterval(intervalId);
    }, []); 

  return (
    <div className=''>
    <section className="bg-orange-600 flex-center flex-col p-8 w-screen inset-x-0">
            <h1 className=" text-white head_text text-center py-4 ">Welcome to the Raffle</h1>
            <p className="desc text-center">Participate in our exciting raffles and stand a chance to win amazing prizes! Multiple games every hour with the opportunity to enter multiple times and even with your lucky numbers. </p>
    </section>
    <RecentWinners allRaffles={allRaffles} session={session}/>
    <Raffles session={session} allRaffles={allRaffles} fetchRaffles={fetchRaffles} archive={false}/>
    
    </div>
  )
}

export default Home