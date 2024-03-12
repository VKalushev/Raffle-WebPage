"use client";

import { useState, useEffect} from "react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import RadioButton from "./RadioButton";

const NumberInput = () => {
    const [value, setValue] = useState(0);
  
    const handleDecrease = () => {
        if (value > 0) {
          setValue(value - 1);
        }
      };
    
      const handleIncrease = () => {
        setValue(value + 1);
      };
    
      const handleChange = (e) => {
        const newValue = parseInt(e.target.value);
        if (!isNaN(newValue)) {
          setValue(newValue);
        }
      };
  
    return (
      <div className="flex items-center space-x-0.5">
        <button
          onClick={handleDecrease}
          className="px-1 py-0 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none"
        >
          -
        </button>
        <input
          type="text"
          value={value}
          onChange={handleChange}
          className="px-1 py-0 w-12 text-center border border-gray-300 rounded-md focus:outline-none"
        />
        <button
          onClick={handleIncrease}
          className="px-1 py-0 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none"
        >
          +
        </button>
      </div>
    );
  };

  const Countdown = ({ drawDate }) => {
    const [countdown, setCountdown] = useState('');
  
    useEffect(() => {
      const intervalId = setInterval(() => {
        const now = new Date();
        const endDate = new Date(drawDate);
        const timeDifference = endDate.getTime() - now.getTime();
  
        if (timeDifference > 0) {
          const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
          const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
  
          setCountdown(`${days} days : ${hours} hours : ${minutes} mins : ${seconds} secs`);
        } else {
          setCountdown('Expired');
          clearInterval(intervalId);
        }
      }, 1000);
  
      return () => clearInterval(intervalId);
    }, []);
  
    return <span>{countdown}</span>;
  };
  
  const RaffleCard = ({ raffle }) => {
    const { data: session } = useSession();
  
    const [selectedOption, setSelectedOption] = useState('random_raffle');
    console.log(raffle);
    const handleOptionChange = (e) => {
      setSelectedOption(e.target.value);
    };
  
    const handleEnterRaffle = async (e) => {
      e.preventDefault();
      try {
        // Handle entering raffle
      } catch (error) {
        console.error('Error entering raffle:', error);
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
              <NumberInput />
            </div>
          ) : (
            <div className="flex-center gap-2 border-b-2 border-b-black p-2 ml-5 mr-5 text-center">
              <span>Enter lucky Number:</span>
              <input className="px-1 py-0 w-12 text-center border border-gray-300 rounded-md focus:outline-none" />
            </div>
          )}
  
          <div className="flex-center m-1">
            <button className="raffle_btn" onClick={handleEnterRaffle}>
              Enter Raffle
            </button>
          </div>
        </footer>
      </div>
    );
  };
  
  export default RaffleCard;
