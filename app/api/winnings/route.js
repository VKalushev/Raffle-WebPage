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
        const winnings = await Winnings.findOne({receiptId: receiptId});
        if (!winnings) {
            return new Response("No Winnings found", { status: 404 });
        }
        if(winnings.userId.toString() === userId.toString()){
            winnings.is_claimed = true;
            winnings.save();
            return new Response(JSON.stringify("Winnings Claimed Successfully"), { status: 200 });
        } else {
            return new Response("To claim the reward login with the related account", { status: 500 });
        }

        
    } catch (error) {
        console.log(error)
        return new Response("Error Updating User", { status: 500 });
    }
};
