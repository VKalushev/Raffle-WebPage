"use client";

import { useState, useEffect} from "react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import RadioButton from "./RadioButton";
import NumberInput from "./NumberInputs";
import Countdown from "./Countdown";
  
  const RaffleCard = ({ raffle }) => {
    const { data: session } = useSession();
    const [ticketCount, setTicketCount] = useState(0);
    const [selectedOption, setSelectedOption] = useState('random_raffle');
    const [message, setMessage] = useState(null);
    const [luckyNumber, setLuckyNumber] = useState("");

    const handleOptionChange = (e) => {
      setSelectedOption(e.target.value);
    };
    const handleInputChange = (e) => {
      setLuckyNumber(e.target.value);
      console.log('Lucky Number:',luckyNumber)
    };

    const handleTicketChange = (newValue) => {
      setTicketCount(newValue);
      console.log('Ticket Count:',ticketCount)
    };

    const handleEnterRaffleButton  = async (e) => {
      e.preventDefault();
      console.log(selectedOption)
      console.log('Test')
      if(selectedOption === 'random_raffle'){
        try { 
          console.log('Test 2')
          const response = await fetch("/api/buy_tickets", {
            method: "POST",
            body: JSON.stringify({
            raffleId: raffle._id,
            user: session.user,
            amountOfTickets: ticketCount,
            }),
          });

          if (response.ok) {
            const {message} = await response.json()
            setMessage(message);
          } else {
            const {message} = await response.json()
            setMessage(message);
          }
        } catch (error) {
            console.log(error);
        }
      } else {
        try { 
          const response = await fetch("/api/buy_tickets/lucky_ticket", {
            method: "POST",
            body: JSON.stringify({
              raffleId: raffle._id,
              user: time,
              luckyNumber: luckyNumber,
            }),
          });  

          if (response.ok) {
            const {message} = await response.json()
            setMessage(message);
          } else {
            const {message} = await response.json()
            setMessage(message);
          }
        } catch (error) {
            console.log(error);
        }
      }
    };
  
    return (
      <div className="prompt_card">
        <header className="raffle-header">
          <span className="reward-box">Price: {raffle.winning_prize}</span>
          <h3 className="p-14 text-center text-xl">
            <Countdown drawDate={raffle.draw_date} />
          </h3>
        </header>
  
        <div className="text-sm text-center border-b-2 border-b-black ml-5 mr-5 p-2">
          <span className="p-2">Tickets: 800</span>
          <span className="p-2">Participants: {raffle.participants.length}</span>
        </div>
        <footer className="">
          <div className="text-red-600 text-2xl border-b-2 border-b-black p-2 ml-5 mr-5 text-center">
            <p>${raffle.entry_price} per ticket</p>
          </div>
  
          <div className="flex-center gap-5 border-b-2 border-b-black p-2 ml-5 mr-5 text-center">
            <RadioButton
              id={0}
              value="random_raffle"
              checked={selectedOption === 'random_raffle'}
              onChange={handleOptionChange}
              label="Random Raffle"
            />
            <RadioButton
              id={1}
              value="lucky_number"
              checked={selectedOption === 'lucky_number'}
              onChange={handleOptionChange}
              label="Enter Lucky Number"
            />
          </div>
  
          {selectedOption === 'random_raffle' ? (
            <div className="flex-center gap-5 border-b-2 border-b-black p-2 ml-5 mr-5 text-center">
              <span>Enter amount of Tickets:</span>
              <NumberInput value={ticketCount} onChange={handleTicketChange} />
            </div>
          ) : (
            <div className="flex-center gap-2 border-b-2 border-b-black p-2 ml-5 mr-5 text-center">
              <span>Enter lucky Number:</span>
              <input value={luckyNumber} onChange={handleInputChange} className="px-1 py-0 w-12 text-center border border-gray-300 rounded-md focus:outline-none" />
            </div>
          )}
  
          <div className="flex-center m-1">
            <button className="raffle_btn" onClick={handleEnterRaffleButton}>
              Enter Raffle
            </button>
            {message && (
              <p className={response.ok ? "text-green-600" : "text-red-600"}>
              {message}
              </p>
            )}
          </div>
        </footer>
      </div>
    );
  };
  
  export default RaffleCard;
