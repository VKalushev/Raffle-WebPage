import Raffle from "@models/raffles";
import { connectToDB } from "@utils/database";

export const POST = async (request) => {
    try {
        await connectToDB()
        console.log('Test 1')
        const { raffleId, user, amountOfTickets } = await request.json();
        console.log(raffleId)
        console.log(user)
        console.log(amountOfTickets)
        
        try {
            console.log('Test 2')
            await Raffle.create({
                winning_prize: reward,
                draw_date: time,
                entry_price: ticketPrice,
              });
              console.log('Test 3')
            return new Response(JSON.stringify("Raffle Successfully created"), { status: 201 });
        }   catch (error) {
            return new Response(JSON.stringify("Failed to create new Raffle"), { status: 500 });
        }
    } catch (error) {
        return new Response(JSON.stringify("Failed to create new Raffle"), { status: 500 })
    }
} 