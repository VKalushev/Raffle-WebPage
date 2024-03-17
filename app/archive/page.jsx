"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Raffles from "@components/Raffles";

const Archive = () => {
    const [allRaffles, setAllRaffles] = useState([]);
    const { data: session } = useSession();
  
    const fetchRaffles = async () => {
      const response = await fetch("/api/raffles");
      const data = await response.json();
      setAllRaffles(data);
    };
  
    useEffect(() => {
      fetchRaffles();
      const intervalId = setInterval(fetchRaffles, 10000  );
       
        return () => clearInterval(intervalId);
      }, []); 
  
  return (
    
    <div>
        <section className="bg-orange-600 flex-center flex-col w-screen p-8">
            <h1 className=" text-white head_text text-center py-4 ">Welcome to the Archive Page</h1>
            <p className="desc text-center">On this page is available the archive of past raffles that have ended in the past 30 days, for further info about old raffles contact support</p>
        </section>
        <Raffles session={session} allRaffles={allRaffles} fetchRaffles={fetchRaffles} archive={true}/>
        </div>
  )
}

export default Archive