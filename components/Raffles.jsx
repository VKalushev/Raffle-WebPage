"use client";

import { useState, useEffect } from "react";

import RaffleCard from "./RaffleCard";

const PromptCardList = ({ data }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((raffle) => (
        <RaffleCard
          key={raffle._id}
          raffle={raffle}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};


const Feed = () => {
    const [allRaffles, setAllRaffles] = useState([]);
  
    const fetchRaffles = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
  
      setAllRaffles(data);
    };
  
    useEffect(() => {
      fetchRaffles();
    }, []);
  
    return (
      <section className='raffles mb-10'>
        <RaffleCard></RaffleCard>
        {/* <PromptCardList data={allRaffles} handleTagClick={handleTagClick} /> */}
      </section>
    );
  };
  
  export default Feed;
  