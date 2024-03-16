import Raffle from "@models/raffles";
import { connectToDB } from "@utils/database";

export const POST = async (request) => {
    const { reward, time, ticketPrice, isSharable } = await request.json();
    
    try {
        await connectToDB()
        console.log(isSharable)
        try {

            await Raffle.create({
                winning_prize: reward,
                draw_date: time,
                entry_price: ticketPrice,
                is_sharable: isSharable,
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