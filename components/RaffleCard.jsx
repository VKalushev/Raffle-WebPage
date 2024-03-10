"use client";

import { useState } from "react";
import Image from "next/image";
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

const RaffleCard = ({  }) => {
    const { data: session } = useSession();

    const [selectedOption, setSelectedOption] = useState('option1');

    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
    };

    return (
        <div className="prompt_card">
            <header className="raffle-header">
                <span className="reward-box">
                    Prize: Electronics Bundle
                </span>
                <h3 className="p-14 text-center text-xl">
                    Draw Date: March 10, 2024
                </h3>
            </header>

            <div className="text-sm text-center border-b-2 border-b-black ml-5 mr-5 p-2">
                <span className="p-2">
                    Tickets: 800
                </span>
                <span className="p-2">
                    Participants: 400
                </span>
            </div>
            <footer className="">
                <div className="text-red-600 text-2xl border-b-2 border-b-black p-2 ml-5 mr-5 text-center">
                    <p>$0 per ticket</p>
                </div>

                <div className="flex-center gap-5 border-b-2 border-b-black p-2 ml-5 mr-5 text-center">
                    <RadioButton id={0} value="random_raffle" 
                                checked={selectedOption === 'random_raffle'} 
                                onChange={handleOptionChange} 
                                label="Random Raffle"/>
                    <RadioButton id={1} value="lucky_number" 
                                checked={selectedOption === 'lucky_number'} 
                                onChange={handleOptionChange} 
                                label="Enter Lucky Number"/>
                </div>
                
                {selectedOption === 'random_raffle' ? (
                    <div className="flex-center gap-5 border-b-2 border-b-black p-2 ml-5 mr-5 text-center">
                    <span>Enter amount of Tickets:</span>
                    <NumberInput/>
                    </div>
                ) : (
                    <div className="flex-center gap-2 border-b-2 border-b-black p-2 ml-5 mr-5 text-center">
                    <span>Enter lucky Number:</span>
                    <input className="px-1 py-0 w-12 text-center border border-gray-300 rounded-md focus:outline-none"></input>
                    </div>
                )}

                <div className="flex-center m-1">
                    <button className="raffle_btn">Enter Raffle</button>
                </div>
                
            </footer>
        </div>
    )
};

export default RaffleCard;
