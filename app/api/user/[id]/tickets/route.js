import { connectToDB } from "@utils/database";
import User from '@models/user';
import mongoose from "mongoose";

export const PATCH = async (request, { params }) => {
    const { raffleId, userId, amountOfTickets, luckyNumber, tickets} = await request.json();

    try {
        await connectToDB();
        let user = undefined;

        let newTickets = []
        if(userId){
            user = await User.findById(userId);
        } else{
            user = await User.findById(tickets);
        }
        
        if (!user) {
            return new Response("User not found", { status: 404 });
        }
        
        if(!tickets){
            if(!amountOfTickets){
                const newTicket = {
                    _id: new mongoose.Types.ObjectId(),
                    raffleId: raffleId,
                    luckyNumber: luckyNumber
                };

                newTickets.push(newTicket)
                user.tickets.push(newTicket)
            } else {
                for (let i = 0; i < amountOfTickets; i++){
                    const newTicket = {
                        _id: new mongoose.Types.ObjectId(),
                        raffleId: raffleId
                    };
                    newTickets.push(newTicket)
                    user.tickets.push(newTicket)
                }
            }
        } else {
            for (let i = 0; i < tickets.length; i++) {
                const ticket = tickets[i];
                if(ticket.userId === user.userId){
                    tickets.splice(i,1)
                    i--
                }
            }
        }

        let response_tickets = [];
        if(newTickets.length > 0){
            response_tickets = newTickets
        } else {
            response_tickets = tickets
        }
        
        await user.save();
        return new Response(JSON.stringify(response_tickets), { status: 200 });

    } catch (error) {
        return new Response("Error Updating Prompt", { status: 500 });
    }
};
