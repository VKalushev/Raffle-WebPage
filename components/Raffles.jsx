"use client";

import { useState, useEffect } from "react";

import PromptCard from "./PromptCard";

const PromptCardList = ({ data }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((raffle) => (
        <PromptCard
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
        <PromptCard></PromptCard>
        {/* <PromptCardList data={allRaffles} handleTagClick={handleTagClick} /> */}
      </section>
    );
  };
  
  export default Feed;
  