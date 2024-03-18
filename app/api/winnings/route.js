import Winnings from "@models/winnings";
import { connectToDB } from "@utils/database";

export const POST = async (request) => {
    const { winner, winning_prize, raffleId } = await request.json();
    try {
        await connectToDB()
        try {
            await Winnings.create({
                userId: winner.userId,
                winning_prize: winning_prize,
                receiptId: winner.receiptId,
                ticketId: winner.ticketId,
                raffleId: raffleId,
                is_claimed: false,
            });
        } catch (error) {
            console.log(error)
            return new Response("Failed to create new winning claim", { status: 500 });
        }
        
        return new Response("Winning claim Successfully created", { status: 201 });
    } catch (error) {
        console.log(error)
        return new Response("Failed to create new winning claim", { status: 500 });
    }
}


export const PATCH = async (request, { params }) => {
    const { userId, receiptId } = await request.json();

    try {
        await connectToDB();
        const user = await Winnings.findById(receiptId);
            
        if (!user) {
            return new Response("User not found", { status: 404 });
        }

        await user.save();
        return new Response(JSON.stringify(winnerUserIDandTicket), { status: 200 });
        
    } catch (error) {
        console.log(error)
        return new Response("Error Updating User", { status: 500 });
    }
};
