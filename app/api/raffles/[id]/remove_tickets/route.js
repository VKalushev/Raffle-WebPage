import { connectToDB } from "@utils/database";
import Raffle from '@models/raffles';

export const PATCH = async (request, { params }) => {
    const { raffleId, userId, tickets} = await request.json();

    try {
        await connectToDB();
        const raffle = await Raffle.findById(raffleId);
        if (!raffle) {
            return new Response("Raffle not found", { status: 404 });
        } else if(!raffle.tickets){
            return new Response("Raffle tickets not found", { status: 404 });
        } else if(raffle.tickets.length === 0){
            return new Response(JSON.stringify("Raffle tickets are empty"), { status: 500 });
        }
        
        if(userId && tickets){
            const oldRaffleLength = raffle.tickets.length;
            tickets.map(ticket => {
                for (let i = 0; i < raffle.tickets.length; i++) {
                    if(ticket._id.toString() === raffle.tickets[i]._id.toString()){
                        raffle.tickets.splice(i,1);
                        break
                    }
                }
            });
            if(oldRaffleLength - tickets.length != raffle.tickets.length ){
                return new Response(JSON.stringify("Not all tickets were removed"), { status: 500 });
            }
            raffle.save()
            return new Response(JSON.stringify("Tickets Removed Successfully"), { status: 200 });
        }

        return new Response(JSON.stringify("There was a problem with userId or the tickets"), { status: 500 });
    } catch (error) {
        console.log(error)
        return new Response("Error Updating Prompt", { status: 500 });
    }
};