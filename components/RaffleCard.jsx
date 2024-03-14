"use client";

import { useState, useEffect} from "react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import RadioButton from "./RadioButton";
import NumberInput from "./NumberInputs";
import Countdown from "./Countdown";
  
  const RaffleCard = ({ raffle, onRaffleCardUpdate }) => {
    const { data: session } = useSession();
    const [ticketCount, setTicketCount] = useState(1);
    const [selectedOption, setSelectedOption] = useState('random_raffle');
    const [message, setMessage] = useState(null);
    const [luckyNumber, setLuckyNumber] = useState('');
    const [countDownText, setcountDownText] = useState('');
    const [isExpired, setIsExpired] = useState(false);
    const [ticketsCount, setTicketsCount] = useState(raffle.tickets.length);
    const [participantsCount, setParticipantsCount] = useState(raffle.participants);
    const router = useRouter();
    useEffect(() => {
      if (countDownText === "Expired") {
        setIsExpired(true);
      }
    }, [countDownText]);

    useEffect(() => {
      setTicketsCount(raffle.tickets.length);
      setParticipantsCount(raffle.participants);
      // onRaffleCardUpdate(/* updated data */);
    }, [raffle]);

    const handleOptionChange = (e) => {
      setSelectedOption(e.target.value);
    };

    const handleInputChange = (e) => {
      setLuckyNumber(e.target.value);
    };

    const handleTicketChange = (newValue) => {
      setTicketCount(newValue);
    };
    
    const handleEdit = () => {
      router.push(`/raffle/${raffle._id}/edit`)
    }

    const handleDelete = async (e) => {
      
      if (window.confirm("Are you sure you want to delete this item?")) {
        try {
          const response = await fetch(`/api/raffles/${raffle._id}`, {
            method: "DELETE",
            body: JSON.stringify({
            raffleId: raffle._id,
            }),
          });
          

          let tickets = await response.json();
          let user_response = undefined;
          while (tickets.length > 0){
            try {
              user_response = await fetch(`/api/user/${tickets[0].userId}/tickets`, {
                method: "PATCH",
                body: JSON.stringify({
                  tickets: tickets,
                  }),
              });
              tickets = await user_response.json()
              
            } catch (error) {
              console.log(error)
              break;
            }
          }
          console.log(user_response.ok)
          if(user_response && user_response.ok){
            onRaffleCardUpdate(/* updated data */);
          }

        } catch (error) {
          console.log(error)
        }
        
      }
    };

    const handleEnterRaffleButton  = async (e) => {
      e.preventDefault();

      const userId = session.user.id.toString();
      let body = {}
      if(selectedOption === 'random_raffle'){
        body = {
          raffleId: raffle._id,
          userId: userId,
          amountOfTickets: ticketCount,
          }
      } else {
        body = {
          raffleId: raffle._id,
          userId: userId,
          luckyNumber: luckyNumber,
          }
      }

      try {
        const response = await fetch(`/api/user/${userId}/tickets`, {
          method: "PATCH",
          body: JSON.stringify(body),
        });

        if (response.ok) {
          const tickets = await response.json()
          try {
            const raffle_response = await fetch(`/api/raffles/${raffle._id}`, {
              method: "PATCH",
              body: JSON.stringify({
              raffleId: raffle._id,
              userId: userId,
              tickets: tickets,
              }),
            });
            
            if (raffle_response.ok) {
              const { message, response_raffle } = await raffle_response.json();
              setMessage(`${tickets.length} tickets were bought succesfully`);
            } else {
              setMessage('There was a problem with buying the tickets')
            }
            
          } catch (error) {
            console.log(error);
          }
        }
      } catch (error) {
        console.log(error);
      }    
    };
  
    return (
      <div className="prompt_card">
        <header className="raffle-header">
          <div className="flex">
            <span className="reward-box">Price: {raffle.winning_prize}</span>

            {session?.user.role === "Admin" && (
              <div className='flex gap'>
                <button className='reward-box' onClick={handleEdit}>Edit</button>
                <button className='reward-box' onClick={handleDelete}> Delete</button>
              </div>
            )}
          </div>
          <h3 className="p-14 text-center text-xl">
          <Countdown drawDate={raffle.draw_date} onStatusChange={setcountDownText} />
          </h3>
        </header>
  
        <div className="text-sm text-center border-b-2 border-b-black ml-5 mr-5 p-2">
          <span className="p-2">Tickets: {ticketsCount}</span>
          <span className="p-2">Participants: {participantsCount}</span>
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
              disabled={isExpired}
            />
            <RadioButton
              id={1}
              value="lucky_number"
              checked={selectedOption === 'lucky_number'}
              onChange={handleOptionChange}
              label="Enter Lucky Number"
              disabled={isExpired}
            />
          </div>
  
          {selectedOption === 'random_raffle' ? (
            <div className="flex-center gap-5 border-b-2 border-b-black p-2 ml-5 mr-5 text-center">
              <span>Enter amount of Tickets:</span>
              <NumberInput value={ticketCount} onChange={handleTicketChange} disabled={isExpired}/>
            </div>
          ) : (
            <div className="flex-center gap-2 border-b-2 border-b-black p-2 ml-5 mr-5 text-center">
              <span>Enter lucky Number:</span>
              <input value={luckyNumber} onChange={handleInputChange} className="px-1 py-0 w-12 text-center border border-gray-300 rounded-md focus:outline-none" disabled={isExpired} />
            </div>
          )}
  
          <div className="flex-center m-1">
            <button className="raffle_btn" onClick={handleEnterRaffleButton} disabled={isExpired}>
              Enter Raffle
            </button>
            
          </div>
          <div className="flex-center">
            {message && (
              <p className={message === 'There was a problem with buying the tickets' ? "text-red-600" : "text-green-600"}>
              {message}
              </p>
            )}
            </div>
        </footer>
      </div>
    );
  };
  
  export default RaffleCard;
