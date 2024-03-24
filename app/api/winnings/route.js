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
            return new Response(JSON.stringify("Failed to create new winning claim"), { status: 500 });
        }
        
        return new Response(JSON.stringify("Winning claim Successfully created"), { status: 201 });
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify("Failed to create new winning claim"), { status: 500 });
    }
}


export const PATCH = async (request, { params }) => {
    const { userId, receiptId } = await request.json();

    try {
        await connectToDB();
        const winnings = await Winnings.findOne({receiptId: receiptId}).populate("userId");
        if (!winnings) {
            return new Response(JSON.stringify("No Winnings found"), { status: 404 });
        }

        if(userId && !winnings.is_claimed){
            if(winnings.userId.toString() === userId.toString()){
                winnings.is_claimed = true;
                winnings.save();
                return new Response(JSON.stringify("Reward Claimed Successfully"), { status: 200 });
            } else {
                return new Response(JSON.stringify("The reward is not yours to claim"), { status: 500 });
            }
        } else if(winnings.userId.username.toString() === "guest" && !winnings.is_claimed){
            winnings.is_claimed = true;
            winnings.save();
            return new Response(JSON.stringify({message: "Reward Claimed Successfully", userId: winnings.userId._id}), { status: 200 });
        } else if (winnings.is_claimed){
            return new Response(JSON.stringify({message: "Reward is claimed already"}), { status: 500 });
        } else{
            return new Response(JSON.stringify("Error Claiming Reward"), { status: 500 });
        }

        
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify("Error Updating Winnings"), { status: 500 });
    }
};
