"use client";

import { useState } from "react";
import CreateRaffle from "./CreateRaffle";
import RaffleCardsList from "./RaffleCardsList";

const Raffles = ({allRaffles, fetchRaffles, session, archive}) => {
  const [creatingRaffle, setCreatingRaffle] = useState(false);
  
  const handleConfirmButton = async (reward, time, ticketPrice, isSharable,userId, ownerName) => {
    console.log(userId)
    console.log(ownerName)
    try { 
      const response = await fetch("/api/raffles/new", {
        method: "POST",
        body: JSON.stringify({
            reward: reward,
            time: time,
            owner: userId,
            ownerName: ownerName,
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
      {archive === false && (session?.user.role === 'Admin' || session?.user.role === 'Normal') && (
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
                    isSharable={false}
                    session={session} />
                )}
              </div>
            )}
              
          </div>
      )}
       {/* <div className="mb-20"><RaffleCard ></RaffleCard></div> */}
       { allRaffles.length > 0 &&(
        <div>
        <RaffleCardsList data={allRaffles} onRaffleCardUpdate={fetchRaffles} createNewRaffle={handleConfirmButton} archive={archive} />
        </div>
       )}
      
    </section>
  );
};

export default Raffles;
  