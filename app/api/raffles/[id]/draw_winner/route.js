import { connectToDB } from "@utils/database";
import Raffle from '@models/raffles';

export const PATCH = async (request, { params }) => {
    const { raffleId } = await request.json();
    try {
        await connectToDB();
        const winnerUserIDandTicket = [];
        let winners = "";
        const raffle = await Raffle.findById(raffleId).populate("tickets.userId");
        
        if(raffle.tickets.length > 0){
            const winningIndex = Math.floor(Math.random() * raffle.tickets.length);
            const winningTicket = raffle.tickets[winningIndex]
            
            winnerUserIDandTicket.push({userId:winningTicket.userId._id.toString(), ticketId: winningTicket._id.toString()});
            const originalWinnerName = winningTicket.userId.username.toString();
            winners = winningTicket.userId.username.toString();
            
            if(winningTicket.luckyNumber){
                for (let i = 0; i < raffle.tickets.length; i++) {
                    const currentTicket = raffle.tickets[i];
                    if(currentTicket.luckyNumber){
                        if(currentTicket.luckyNumber.toString() === winningTicket.luckyNumber.toString() && currentTicket.userId.username.toString() !== originalWinnerName){
                            winnerUserIDandTicket.push({userId:currentTicket.userId._id.toString(), ticketId: currentTicket._id.toString()});

                            if(i + 1 === raffle.tickets.length){
                                winners += ` and ${currentTicket.userId.username}`;
                            } else {
                                winners += `, ${currentTicket.userId.username}`;
                            }
                        }
                    }
                }
            }
        } else {
            winners = "No Participants"
        }
        const uniqueUserIds = [];
        raffle.tickets.forEach(ticket => {
            const userIdString = ticket.userId._id.toString();
            if (!uniqueUserIds.includes(userIdString)) {
                uniqueUserIds.push(userIdString);
            }
        });
            
        raffle.winner = winners;
        raffle.archived = true;
        await raffle.save();
        return new Response(JSON.stringify({uniqueUserIds: uniqueUserIds, winnerUserIDandTicket: winnerUserIDandTicket}), { status: 200 })
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify("Error with the drawing a winner for the raffle"), { status: 500 });
    }
};