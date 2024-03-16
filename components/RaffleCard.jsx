"use client";

import { useState, useEffect} from "react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import RadioButton from "./RadioButton";
import NumberInput from "./NumberInputs";
import Countdown from "./Countdown";
import Link from "next/link";
  
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
    const [isWinnerDrawn, setIsWinnerDrawn] = useState(false);
    const router = useRouter();
    
    useEffect(() => {
      if (countDownText === "Expired") {
        setIsExpired(true);
        if(!isWinnerDrawn) {
          drawWinner();
          setIsWinnerDrawn(true);
        }
      }
    }, [countDownText]);

    useEffect(() => {
      setTicketsCount(raffle.tickets.length);
      setParticipantsCount(raffle.participants);
    }, [raffle]);

    const drawWinner = async () => {  
      try {
        const response = await fetch(`/api/raffles/${raffle._id}/draw_winner`, {
          method: "PATCH",
          body: JSON.stringify({
            raffleId: raffle._id,
            }),
        });

        let {tickets} = await response.json();
        
        // setRaffleWinner(winnerString)
        let user_response = undefined
        while (tickets.length > 0){
          try {
            user_response = await fetch(`/api/user/${tickets[0].userId}/tickets`, {
              method: "PATCH",
              body: JSON.stringify({
                tickets: tickets,
                }),
            });

            if(response.ok){
              tickets = await user_response.json()
            } else {
              console.log('There was an issue with the User API')
              break;
            }
            
          } catch (error) {
            console.log(error)
            break;
          }
        }
        if(user_response && user_response.ok){
          onRaffleCardUpdate(/* updated data */);
        }

      } catch (error) {
        console.log(error)
      }
    }
    // console.log(raffle.is_sharable)
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
      router.push(`/raffle/${raffle._id}/edit?raffle=${JSON.stringify(raffle)}`);
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

              if(response.ok){
                tickets = await user_response.json()
              } else {
                console.log('There was an issue with the User API')
                break;
              }
              
            } catch (error) {
              console.log(error)
              break;
            }
          }
          if(user_response && user_response.ok){
            onRaffleCardUpdate(/* updated data */);
          }

        } catch (error) {
          console.log(error)
        }
        
      }
    };

    const handleOpenRafflePage = () => {
      router.push(`/raffle/${raffle._id}`);
    }

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
          raffle: raffle,
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
        } else {
          setMessage(await response.json())
        }
      } catch (error) {
        console.log(error);
      }    
    };
  
    return (
      <div className="raffle_card">
        <header className="raffle-header cursor-pointer" onClick={handleOpenRafflePage}>
          <div className="flex">
            <span className="reward-box">Prize: {raffle.winning_prize}</span>
            <span className="reward-box">Sharable: {raffle.is_sharable.toString()}</span>
            
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

          {!isExpired ?(
            <div>
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
            </div>
          ): (
            <div>
              <div className="flex-center gap-5 ml-5 mr-5 text-center">Winner/s:</div>
              <div className="flex-center gap-5 border-b-2 border-b-black  ml-5 mr-5 text-center">{raffle.winner}</div>
            </div>
          )}
          
  
          <div className="flex-center m-1">
            <button className="raffle_btn" onClick={handleEnterRaffleButton} disabled={isExpired}>
              Enter Raffle
            </button>
            {session?.user.role === "Admin" && (
              <div className='flex gap'>
                <button className='raffle_btn' onClick={handleEdit}>Edit</button>
                <button className='raffle_btn' onClick={handleDelete}> Delete</button>
              </div>
            )}
          </div>
          <div className="flex-center">
            {message && (
              <p className={message === 'There was a problem with buying the tickets' || message === "You already have that lucky number for this raffle" || message === "Sorry but Number has been picked by another user" ? "text-red-600" : "text-green-600"}>
              {message}
              </p>
            )}
            </div>
        </footer>
      </div>
    );
  };
  
  export default RaffleCard;
