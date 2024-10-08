import { connectToDB } from "@utils/database";
import Raffle from '@models/raffles';

export const GET = async (request, { params }) => {
    try {
        await connectToDB()
        const raffle = await Raffle.findById(params.id).populate("tickets.userId")
        let data = [];
        
        raffle.tickets.forEach(ticket => {
            const current_user_username = ticket.userId.username;
            let isUserInData = false;
            for (let i = 0; i < data.length; i++) {
                if(data[i].option === current_user_username || data[i].option === ticket.luckyNumber){
                    data[i].optionSize +=1;
                    isUserInData = true;
                    break;
                }
            }
            
            if(!isUserInData){
                if(ticket.luckyNumber){
                    data.push({option: ticket.luckyNumber, optionSize: 1});
                } else {
                    data.push({option: current_user_username, optionSize: 1});
                }
            }
            
        });

        return new Response(JSON.stringify({response_data: raffle}), { status: 200 })
    } catch (error) {
        return new Response(JSON.stringify("Failed to fetch raffle by ID Failed"), { status: 500 })
    }
} 

export const PATCH = async (request, { params }) => {
    const { raffleId, userId, tickets, winning_prize, entry_price, draw_date, isSharable, owner} = await request.json();

    try {
        await connectToDB();
        const raffle = await Raffle.findById(raffleId);

        if (!raffle) {
            return new Response(JSON.stringify("Raffle not found"), { status: 404 });
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
        if(isSharable != undefined){
            raffle.is_sharable = isSharable;
        }
        if(owner){
            raffle.owner = owner
        }
        
        try {
            const response_raffle = raffle;
            await raffle.save();
            return new Response(JSON.stringify({ message: "Successfully updated the Raffles", response_raffle: response_raffle }), { status: 200 });
        } catch (error) {
            console.log(error)
            return new Response(JSON.stringify("Error Updating Prompt"), { status: 500 });
        }
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify("Error Updating Prompt"), { status: 500 });
    }
};

export const DELETE = async (request, { params }) => {
    const { raffleId } = await request.json();
    try {
        await connectToDB();
        const raffle = await Raffle.findByIdAndDelete(raffleId)

        const uniqueUserIds = [];
        raffle.tickets.forEach(ticket => {
            const userIdString = ticket.userId.toString();
            if (!uniqueUserIds.includes(userIdString)) {
                uniqueUserIds.push(userIdString);
            }
        });
        return new Response(JSON.stringify(uniqueUserIds), { status: 200 });
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify("Error Updating Prompt"), { status: 500 });
    }
};