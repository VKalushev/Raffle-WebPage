import { connectToDB } from "@utils/database";
import User from '@models/user';
import mongoose from "mongoose";

export const PATCH = async (request, { params }) => {
    const { raffleId, userId, amountOfTickets, luckyNumber, tickets, test} = await request.json();

    try {
        await connectToDB();
        let user = undefined;
        let newTickets = []

        if(userId){
            user = await User.findById(userId);
        } else{
            user = await User.findById(tickets[0].userId);
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
                const first_userId_string = ticket.userId.toString()
                const second_userId_string = user._id.toString()
                if(first_userId_string === second_userId_string){
                    for (let k = 0; k < user.tickets.length; k++) {
                        const first_ticket_id = ticket._id.toString()
                        const second_ticket_id = user.tickets[k]._id.toString()
                        // console.log(`${first_ticket_id} === ${second_ticket_id}: `,first_ticket_id === second_ticket_id)
                        if(first_ticket_id === second_ticket_id){
                            user.tickets.splice(k,1)
                        }
                    }
                    tickets.splice(i,1)
                    i--
                }
            }
        }
        // console.log(user.tickets)
        // console.log(tickets)
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
