import { connectToDB } from "@utils/database";
import Raffle from '@models/raffles';

export const GET = async (request, { params }) => {
    try {
        await connectToDB()

        let winners = []
        const raffle = await Raffle.findById(params.id).populate("tickets.userId")
        const winningIndex = Math.floor(Math.random() * raffle.tickets.length);
        const winningTicket = raffle.tickets[winningIndex]
        if(winningTicket) {
        // winners.push(winningTicket.userId.username.toString());
        
        if(winningTicket.luckyNumber){
            raffle.tickets.forEach(ticket => {
                if(ticket.luckyNumber){
                    if(ticket.luckyNumber === winningTicket.luckyNumber){
                        winners.push(ticket.userId.username.toString())
                    }
                }
            });
        }
        }

        return new Response(JSON.stringify({winner: winners, tickets: raffle.tickets}), { status: 200 })
    } catch (error) {
        console.log(error)
        return new Response("Failed to fetch raffle by ID Failed", { status: 500 })
    }
} 

export const PATCH = async (request, { params }) => {
    const { raffleId } = await request.json();

    try {
        await connectToDB();
        let winners = ""
        const raffle = await Raffle.findById(raffleId).populate("tickets.userId");
        if(raffle.tickets){
            const winningIndex = Math.floor(Math.random() * raffle.tickets.length);
            const winningTicket = raffle.tickets[winningIndex]
            if(winningTicket) {
                winners = winningTicket.userId.username.toString();
                if(winningTicket.luckyNumber){
                    for (let i = 1; i < raffle.tickets.length; i++) {
                        const currentWinner = raffle.tickets[i].userId.username;
                        if(i + 1 === raffle.tickets.length){
                            winners += ` and ${currentWinner}`;
                        } else {
                            winners += `, ${currentWinner}`;
                        }
                    }
                }
            }
        } else {
            winners = "No Participants"
        }
            
        raffle.winner = winners;
        raffle.archived = true;
        await raffle.save();
        return new Response(JSON.stringify({tickets: raffle.tickets}), { status: 200 })
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify("Error with the drawing a winner for the raffle"), { status: 500 });
    }
};