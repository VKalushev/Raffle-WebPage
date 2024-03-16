"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import RaffleCard from "./RaffleCard";
import CreateRaffle from "./CreateRaffle";

const PromptRaffleList = ({ data, onRaffleCardUpdate }) => {
  // Check if data exists and is not empty
  if (!data || data.length === 0) {
    return null; // or you can render a placeholder, message, or any other UI element
  }

  // Filter out archived raffles
  const activeRaffles = data.filter((raffle) => !raffle.archived);

  return (
    <div className='prompt_layout'>
      {activeRaffles.map((raffle) => (
        <RaffleCard
          key={raffle._id}
          raffle={raffle}
          onRaffleCardUpdate={onRaffleCardUpdate}
        />
      ))}
    </div>
  );
};

const Raffles = ({allRaffles, fetchRaffles, session}) => {
  const [creatingRaffle, setCreatingRaffle] = useState(false);


  useEffect(() => {
    fetchRaffles();
  }, []);

  
  const handleConfirmButton = async (reward, time, ticketPrice, isSharable) => {
    try { 
      const response = await fetch("/api/raffles/new", {
        method: "POST",
        body: JSON.stringify({
            reward: reward,
            time: time,
            ticketPrice: ticketPrice,
            isSharable: isSharable,
        }),
      });
      
      if (response.ok) {
        setCreatingRaffle(false);
        fetchRaffles();
      } else {
        const {message} = await response.json()
        console.error(message);
      }
    } catch (error) {
        console.log(error);
    }
  };

  const openCreateRaffleWindow = () => {
    setCreatingRaffle(true);
  }
  
  const handleCancelCreateRaffle = () => {
    setCreatingRaffle(false);
  };

  return (
    <section className='m-12'>
      {session?.user.role === 'Admin' && (
        <div>
          {!creatingRaffle ? (
            <div className="new_raffle_button flex items-center justify-center text-9xl">
            {/* Render a button to create a new raffle */}
            <button className="" onClick={openCreateRaffleWindow}>
              <div className="w-40 h-40">+</div> {/* Plus icon */}
            </button>
            </div>
          ): (
            <div>
              {/* If the admin is creating a new raffle, render the new raffle card template */}
              {creatingRaffle && (
                <CreateRaffle 
                  onCancel={handleCancelCreateRaffle}
                  onConfirm={handleConfirmButton}
                  reward_place_holder="Enter Prize"
                  time_place_holder=""
                  ticketPrice_place_holder={0}
                  isSharable={false} />
              )}
            </div>
          )}
            
        </div>
      )}
       {/* <div className="mb-20"><RaffleCard ></RaffleCard></div> */}
       { allRaffles.length > 0 &&(
        <div>
        <PromptRaffleList data={allRaffles} onRaffleCardUpdate={fetchRaffles}/>
        </div>
       )}
      
    </section>
  );
};

export default Raffles;
  