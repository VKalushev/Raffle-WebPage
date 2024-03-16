"use client";

import CreateRaffle from "@components/CreateRaffle";
import { useRouter, useSearchParams } from "next/navigation";

const EditPage = () => {
  const searchParams = useSearchParams();
  const raffleParam = searchParams.get("raffle");
  const raffle = JSON.parse(raffleParam);
  const router = useRouter();


  const handleCancelCreateRaffle = () => {
    if (window.confirm("Are you sure you want to cancel edditing?")) {
      router.push('/')
    }
  };

  const handleConfirmButton = async (reward, time, ticketPrice) => {
    
    if (window.confirm("Are you sure you want to save the changes?")) {
      try { 
        const response = await fetch(`/api/raffles/${raffle._id}`, {
          method: "PATCH",
          body: JSON.stringify({
            raffleId: raffle._id,
            winning_prize: reward,
            draw_date: time,
            entry_price: ticketPrice,
          }),
        });
        if (response.ok) {
          router.push('/')
        } else {
          const {message} = await response.json()
          console.error(message);
        }
      } catch (error) {
          console.log(error);
      }
    }
  };

  return (
    <div>
      <section className="bg-orange-600 flex-center flex-col w-screen p-8">
            <h1 className=" text-white head_text text-center py-4 ">Welcome to the Editing Page</h1>
            <p className="desc text-center">Edit Raffles with single clicks and changes, change the prize title, the entry price or even when the end date/time for the raffle </p>
      </section>
      <div className="prompt_layout">
        <CreateRaffle 
        onCancel={handleCancelCreateRaffle}
        onConfirm={handleConfirmButton}
        reward_place_holder={raffle.winning_prize}
        time_place_holder={raffle.draw_date.slice(0, -1)}
        ticketPrice_place_holder={parseInt(raffle.entry_price)} 
        />
      </div>
    </div>
  )
}

export default EditPage