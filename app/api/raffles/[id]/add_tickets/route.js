import { connectToDB } from "@utils/database";
import Raffle from '@models/raffles';

export const PATCH = async (request, { params }) => {
    const { raffleId, userId, tickets } = await request.json();

    try {
        await connectToDB();
        const raffle = await Raffle.findById(raffleId);

        if (!raffle) {
            return new Response("Raffle not found", { status: 404 });
        }

        tickets.forEach(ticket => {
            console.log(ticket.luckyNumber)
            let newTicket = {}
            if(!ticket.luckyNumber){
                newTicket = {
                    _id: ticket._id,
                    userId: userId
                };
            } else {
                newTicket = {
                    _id: ticket._id,
                    userId: userId,
                    luckyNumber: ticket.luckyNumber
                };
            }
            raffle.tickets.push(newTicket)
        });
        try {
            await raffle.save();
            return new Response(JSON.stringify("Successfully updated the Raffles"), { status: 200 });
        } catch (error) {
            console.log(error)
            return new Response("Error Updating Prompt", { status: 500 });
        }
    } catch (error) {
        return new Response("Error Updating Prompt", { status: 500 });
    }
};