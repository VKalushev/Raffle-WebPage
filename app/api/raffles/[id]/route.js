import { connectToDB } from "@utils/database";
import Raffle from '@models/raffles';

export const GET = async (request, { params }) => {
    try {
        await connectToDB()

        const raffle = await Raffle.findById(params.id)

        return new Response(JSON.stringify(raffle), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch raffle by ID Failed", { status: 500 })
    }
} 

export const PATCH = async (request, { params }) => {
    const { raffleId, userId, tickets, winning_prize, entry_price, draw_date} = await request.json();

    try {
        await connectToDB();
        const raffle = await Raffle.findById(raffleId);

        if (!raffle) {
            return new Response("Raffle not found", { status: 404 });
        }
        
        if(userId && tickets){
            tickets.forEach(ticket => {
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
                raffle.tickets.push(newTicket);
            });

            const uniqueUserIds = new Set();
            raffle.tickets.forEach(ticket => {
                if (!uniqueUserIds.has(ticket.userId.toString())) {
                    uniqueUserIds.add(ticket.userId.toString());
                }
            });

            raffle.participants = uniqueUserIds.size;            
        }
        if(winning_prize){
            raffle.winning_prize = winning_prize;
        }

        if(entry_price){
            raffle.entry_price = entry_price;
        }

        if(draw_date){
            raffle.draw_date = draw_date;
        }
        try {
            const response_raffle = raffle;
            await raffle.save();
            return new Response(JSON.stringify({ message: "Successfully updated the Raffles", response_raffle: response_raffle }), { status: 200 });
        } catch (error) {
            console.log(error)
            return new Response("Error Updating Prompt", { status: 500 });
        }
    } catch (error) {
        return new Response("Error Updating Prompt", { status: 500 });
    }
};

export const DELETE = async (request, { params }) => {
    const { raffleId } = await request.json();
    try {
        await connectToDB();
        const raffle = await Raffle.findByIdAndDelete(raffleId);
        
        return new Response(JSON.stringify(raffle.tickets), { status: 200 });
    } catch (error) {
        console.log(error)
        return new Response("Error Updating Prompt", { status: 500 });
    }
};