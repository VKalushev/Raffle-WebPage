import { connectToDB } from "@utils/database";
import User from '@models/user';
import mongoose from "mongoose";

export const PATCH = async (request, { params }) => {
    const { userId, amountOfTickets, luckyNumber, is_adding_new_tickets, raffle} = await request.json();

    try {
        await connectToDB();
        const user = await User.findById(userId);
        let newTickets = []
            
        if (!user) {
            return new Response("User not found", { status: 404 });
        }
        // If there is no such variables tickets it would proceed to add the 
        // amount of tickets provide or lucky Number, but if there is tickets 
        // variable it would remove the tickets from the user account
        if(is_adding_new_tickets){
            // If amount of tickets is given it means multiple tickets else it would be a luckyNumber ticket
            if(!amountOfTickets){
                    for (let i = 0; i < raffle.tickets.length; i++) {
                        const currentTicket = raffle.tickets[i];
                        if(currentTicket.luckyNumber){
                            console.log("Test 1")
                            if (luckyNumber.toString() === currentTicket.luckyNumber.toString()) {
                                if(currentTicket.userId != userId && !raffle.is_sharable){
                                    return new Response(JSON.stringify("Sorry but Number has been picked by another user"), { status: 500 });
                                } else {
                                    return new Response(JSON.stringify("You already have that lucky number for this raffle"), { status: 500 });
                    
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
            } else {
                for (let i = 0; i < amountOfTickets; i++){
                    const newTicket = {
                        _id: new mongoose.Types.ObjectId(),
                        raffleId: raffle._id
                    };
                    newTickets.push(newTicket)
                }
            }

            const newReceipt = {
                raffleId: raffle._id,
                tickets: newTickets
            }
            user.receipts.push(newReceipt)
            await user.save();
            return new Response(JSON.stringify(newTickets), { status: 200 });
        } else {
            for (let i = 0; i < user.receipts.length; i++) {
                const receipt = user.receipts[i];

                if(receipt.raffleId.toString() === raffle._id.toString()){
                    user.receipts.splice(i,1)
                    i -=1;
                }
                
            }
            await user.save();
            return new Response(JSON.stringify("User Receipt Deleted Successfully"), { status: 200 });
        }


    } catch (error) {
        console.log(error)
        return new Response("Error Updating User", { status: 500 });
    }
};
