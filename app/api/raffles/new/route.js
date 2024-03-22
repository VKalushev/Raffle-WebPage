import Raffle from "@models/raffles";
import { connectToDB } from "@utils/database";

export const POST = async (request) => {
    const { reward, time, ticketPrice, isSharable, owner, ownerName } = await request.json();
    
    try {
        await connectToDB()
        try {

            await Raffle.create({
                winning_prize: reward,
                owner: owner,
                ownerName: ownerName,
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