import { connectToDB } from "@utils/database";
import User from '@models/user';
import mongoose from "mongoose";

export const PATCH = async (request, { params }) => {
    const { raffleId, userId, amountOfTickets, luckyNumber, tickets, raffle} = await request.json();

    try {
        await connectToDB();
        let user = undefined;
        let newTickets = []
        
        if(userId){
            user = await User.findById(userId);
        } else {
            user = await User.findById(tickets[0].userId._id);
        }
            
        if (!user) {
            return new Response("User not found", { status: 404 });
        }
        
        // If there is no such variables tickets it would proceed to add the 
        // amount of tickets provide or lucky Number, but if there is tickets 
        // variable it would remove the tickets from the user account
        if(!tickets){
            // If amount of tickets is given it means multiple tickets else it would be a luckyNumber ticket
            if(!amountOfTickets){
                if(!raffle.is_sharable){
                    for (let i = 0; i < raffle.tickets.length; i++) {
                        const currentTicket = raffle.tickets[i];
                        if(currentTicket.luckyNumber){
                            if (luckyNumber.toString() === currentTicket.luckyNumber.toString()) {
                                if(currentTicket.userId != userId){
                                    return new Response(JSON.stringify("Sorry but Number has been picked by another user"), { status: 500 });
                                } else {
                                    return new Response(JSON.stringify("You already have that lucky number for this raffle"), { status: 500 });
                                }
                            }
                        }
                        
                    }
                }
                
                const newTicket = {
                    _id: new mongoose.Types.ObjectId(),
                    raffleId: raffle._id,
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
                const first_userId_string = ticket.userId._id.toString()
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
        console.log(error)
        return new Response("Error Updating Prompt", { status: 500 });
    }
};
