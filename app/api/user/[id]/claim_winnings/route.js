import { connectToDB } from "@utils/database";
import User from '@models/user';
import mongoose from "mongoose";

export const PATCH = async (request, { params }) => {
    const { userId, receiptId } = await request.json();

    try {
        await connectToDB();
        const user = await User.findById(userId);
        
        if (!user) {
            return new Response("User not found", { status: 404 });
        }
        
        try{
            for (let i = 0; i < user.winning_receipts.length; i++) {
                if(user.winning_receipts[i]._id.toString() === receiptId.toString()){
                    user.winning_receipts[i].is_claimed = true;
                    await user.save();
                    return new Response(JSON.stringify("Reward claimed Successfully"), { status: 200 });
                }
            }
        } catch(error) {
            console.log(error)
        }
        
        return new Response(JSON.stringify("The winning receipt was not found"), { status: 500 });
    } catch (error) {
        console.log(error)
        return new Response("Error Updating User", { status: 500 });
    }
};