import RadioButton from "./RadioButton";

import { useState } from "react";

const CreateRaffle = ({ onCancel, onConfirm, reward_place_holder, time_place_holder, ticketPrice_place_holder, isSharable, session}) => {
    const [reward, setReward] = useState(reward_place_holder);
    const [time, setTime] = useState(time_place_holder);
    const [ticketPrice, setTicketPrice] = useState(ticketPrice_place_holder);
    const [isShared, setIsShared] = useState(isSharable);


    const currentDate = new Date().toISOString().split("T")[0];
    const currentTime = new Date().toTimeString().split(" ")[0];
    const currentDateTime = currentDate + " " + currentTime;
    console.log(currentDateTime)

    const handleConfirmClick = (e) => {
        e.preventDefault();
        console.log(session)
        onConfirm(reward, time, ticketPrice, isShared, session.user.id, session.user.name);
    };

    const handleCancelClick = () => {
        setReward('')
        setTime('')
        setTicketPrice(0)
        onCancel();
      };

      const handleOptionChange = (e) => {
        const newValue = e.target.value === "is_sharable";
        setIsShared(newValue);
    };

    return (
    <form onSubmit={handleConfirmClick} className="rounded-lg border border-black bg-green-300  md:w-[360px] w-full h-fit">   
        <header className="raffle-header" >
            <input className="input-reward-box " value={reward} placeholder="Prize: Electronics Bundle" required onChange={(e) => setReward(e.target.value)}></input>

            <div className="is-sharable-box">
                    <RadioButton 
                        id={0}
                        value="is_sharable"
                        checked={isShared}
                        onChange={handleOptionChange}
                        label="Is Shared"
                        disabled={false}
                    />
                    <RadioButton 
                        id={1} 
                        value="not_sharable" 
                        checked={!isShared}
                        onChange={handleOptionChange} 
                        label="Not Shared"
                        disabled={false}
                    />
                </div>

            <h3 className="p-14 text-center text-xl text-black">
            <input
                type="datetime-local"
                placeholder="Select Time"
                required
                min={currentDateTime.slice(0, -3)}
                value={time}
                onChange={(e) => setTime(e.target.value)}
            />
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
                    value={ticketPrice}
                    className="text-red-600 text-2xl rounded-lg border w-14 text-center outline-none"
                    onChange={(e) => setTicketPrice(e.target.value)}
                />
            </div>

            <div className="flex-center gap-5 border-b-2 border-b-black p-2 ml-5 mr-5 text-center">
                <RadioButton 
                    id={0} value="random_raffle" 
                    checked= {true} 
                    onChange={() => {}} 
                    label="Random Raffle"
                    disabled = {true}
                    />
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
                <button className="raffle_btn" onClick={handleCancelClick}>Cancel</button>
                <button className="raffle_btn" type="submit">Confirm</button>
            </div>
          
        </footer>
      </form>
    
  )
}

export default CreateRaffle;