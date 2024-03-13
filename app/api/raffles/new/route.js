import Raffle from "@models/raffles";
import { connectToDB } from "@utils/database";

export const POST = async (request) => {
    try {
        await connectToDB()
        const { reward, time, ticketPrice } = await request.json();
    
        try {

            await Raffle.create({
                winning_prize: reward,
                draw_date: time,
                entry_price: ticketPrice,
            });
            return new Response(JSON.stringify("Raffle Successfully created"), { status: 201 });
        }   catch (error) {
            console.log(error)
            return new Response(JSON.stringify("Failed to create new Raffle"), { status: 500 });
        }
    } catch (error) {
        return new Response(JSON.stringify("Failed to create new Raffle"), { status: 500 })
    }
} 