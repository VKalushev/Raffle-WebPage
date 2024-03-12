"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import RaffleCard from "./RaffleCard";
import RadioButton from "./RadioButton";

const PromptCardList = ({ allRaffles, handleEnterButton }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {allRaffles.map((raffle) => (
        <RaffleCard
          key={raffle._id}
          raffle={raffle}
          handleEnterButton={handleEnterButton}
        />
      ))}
    </div>
  );
};


const Raffles = () => {
  const [allRaffles, setAllRaffles] = useState([]);
  const [creatingRaffle, setCreatingRaffle] = useState(false); // State to manage the creation of a new raffle
  const { data: session } = useSession();
  const [reward, setReward] = useState('');
  const [time, setTime] = useState('');
  const [ticketPrice, setTicketPrice] = useState('');

  // console.log(session.user)
  const fetchRaffles = async () => {
    const response = await fetch("/api/raffles");
    const data = await response.json();

    setAllRaffles(data);
  };

  useEffect(() => {
    fetchRaffles();
  }, []);
  
  const handleCreateRaffle = async (e) => {
    // Set the state to true to indicate that the user is creating a new raffle
    e.preventDefault();

    try { 
      const response = await fetch("/api/raffles/new", {
        method: "POST",
        body: JSON.stringify({
            reward: reward,
            time: time,
            ticketPrice: ticketPrice,
        }),
    });
    
    console.log(response)
    
        if (response.ok) {
            router.push("/login");
        } else {
          const {message} = await response.json()
          setError(message)
        }
    } catch (error) {
        console.log(error);
    }
  };

  const openCreateRaffleWindow = () => {
    setCreatingRaffle(true);
  }
  
  const handleCancelCreateRaffle = () => {
    // Set the state to false to cancel the creation of a new raffle
    setCreatingRaffle(false);
    setReward('')
    setTime('')
    setTicketPrice('')
  };

  return (
    <section className='raffles m-5'>
      {session?.user.role === 'Admin' ? (
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
              <div className="prompt_card">
              <header className="raffle-header" >
                  <input className="input-reward-box " placeholder="Prize: Electronics Bundle" required onChange={(e) => setReward(e.target.value)}></input>
                  <h3 className="p-14 text-center text-xl text-black">
                  <input type="datetime-local" placeholder="Select Time" required onChange={(e) => setTime(e.target.value)}/>
                  </h3>
              </header>
  
              <div className="text-sm text-center border-b-2 border-b-black ml-5 mr-5 p-2">
                  <span className="p-2">
                      Tickets: 0
                  </span>
                  <span className="p-2">
                      Participants: 0
                  </span>
              </div>
              <footer className="">
              <div className="flex-center border-b-2 border-b-black p-2 ml-5 mr-5 text-center">
                <label htmlFor="ticketPrice" className="text-red-600 text-2xl mr-2">
                  Ticket price in $:
                </label>
                <input
                  type="number"
                  id="ticketPrice"
                  min="0"
                  step="1"
                  defaultValue="0"
                  className="text-red-600 text-2xl rounded-lg border w-14 text-center outline-none"
                  onChange={(e) => setTicketPrice(e.target.value)}
                />
              </div>
  
                  <div className="flex-center gap-5 border-b-2 border-b-black p-2 ml-5 mr-5 text-center">
                      <RadioButton id={0} value="random_raffle" 
                                checked= {true} 
                                onChange={() => {}} 
                                label="Random Raffle"
                                disabled = {true}/>
                    <RadioButton id={1} value="lucky_number" 
                                checked={false} 
                                onChange={() => {}} 
                                label="Enter Lucky Number"
                                disabled = {true}/>
                  </div>
                      <div className="flex-center gap-2 border-b-2 border-b-black p-2 ml-5 mr-5 text-center">
                      <span>Enter lucky Number:</span>
                      <input className="px-1 py-0 w-12 text-center border border-gray-300 rounded-md focus:outline-none" disabled></input>
                      </div>
                  <div className="flex-center m-1">
                      <button className="raffle_btn" onClick={handleCancelCreateRaffle}>Cancel</button>
                      <button className="raffle_btn" onClick={handleCreateRaffle}>Confirm</button>
                  </div>
                  
              </footer>
          </div>
            )}
          </div>
          )}
            
        </div>
      ): (
        <div>No user</div>
      )}
       <div className="mb-20"><RaffleCard ></RaffleCard></div>
      {/* <PromptCardList data={allRaffles} handleTagClick={handleEnterButton} /> */}
    </section>
  );
};

export default Raffles;
  