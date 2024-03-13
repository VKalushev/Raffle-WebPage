import { connectToDB } from "@utils/database";
import User from '@models/user';
import mongoose from "mongoose";

export const PATCH = async (request, { params }) => {
    const { raffleId, userId, amountOfTickets, luckyNumber } = await request.json();

    try {
        await connectToDB();
        const user = await User.findById(userId);
        let tickets = []

        if (!user) {
            return new Response("User not found", { status: 404 });
        }

        if(!amountOfTickets){
            const newTicket = {
                _id: new mongoose.Types.ObjectId(),
                raffleId: raffleId,
                luckyNumber: luckyNumber
            };

            tickets.push(newTicket)
            user.tickets.push(newTicket)
        } else {
            for (let i = 0; i < amountOfTickets; i++){
                const newTicket = {
                    _id: new mongoose.Types.ObjectId(),
                    raffleId: raffleId
                };
                tickets.push(newTicket)
                user.tickets.push(newTicket)
            }
        }

        await user.save();
        return new Response(JSON.stringify(tickets), { status: 200 });

    } catch (error) {
        return new Response("Error Updating Prompt", { status: 500 });
    }
};
