"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import RaffleCard from "./RaffleCard";
import RadioButton from "./RadioButton";

const PromptRaffleList = ({ data}) => {
  return (
    <div className='prompt_layout'>
      {data && data.length > 0 && data.map((raffle) => (
        <RaffleCard
          key={raffle._id}
          raffle={raffle}
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
  const [ticketPrice, setTicketPrice] = useState(0);

  const currentDateTime = new Date().toISOString().split("T")[0] + "T" + new Date().toTimeString().split(" ")[0];

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
      
      if (response.ok) {
        setCreatingRaffle(false);
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
    // Set the state to false to cancel the creation of a new raffle
    setCreatingRaffle(false);
    setReward('')
    setTime('')
    setTicketPrice(0)
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
              // <div className="prompt_card">
              <form onSubmit={handleCreateRaffle} className="rounded-lg border border-black bg-green-300  md:w-[360px] w-full h-fit">
              <header className="raffle-header" >
                  <input className="input-reward-box " placeholder="Prize: Electronics Bundle" required onChange={(e) => setReward(e.target.value)}></input>
                  <h3 className="p-14 text-center text-xl text-black">
                  <input type="datetime-local" placeholder="Select Time" required min={currentDateTime} onChange={(e) => setTime(e.target.value)}/>
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
                      <button className="raffle_btn" type="submit">Confirm</button>
                  </div>
                  
              </footer>
              </form>
            /* </div> */
            )}
          </div>
          )}
            
        </div>
      )}
       {/* <div className="mb-20"><RaffleCard ></RaffleCard></div> */}
       { allRaffles.length > 0 &&(
        <div>
        <PromptRaffleList data={allRaffles}/>
        </div>
       )}
      
    </section>
  );
};

export default Raffles;
  