import { connectToDB } from "@utils/database";
import User from '@models/user';

export const GET = async (request, { params }) => {
    try {
        await connectToDB()

        const user = await User.findById(params.id)
        if (!user) return new Response("User Not Found", { status: 404 });

        return new Response(JSON.stringify(user), { status: 200 })

    } catch (error) {
        return new Response("Internal Server Error", { status: 500 });
    }
}

export const PATCH = async (request, { params }) => {
    const { userId, email, password, username, receiptId } = await request.json();

    try {
        await connectToDB();
        const user = await Winnings.findById(userId);
            
        if (!user) {
            return new Response(JSON.stringify("User not found"), { status: 404 });
        }

        if(email){
            user.email = email;
        }

        if(password){
            const hashedPassword = await bcrypt.hash(password, 10);
            user.password = hashedPassword;
        }

        if(username){
            user.username = username;
        }

        await user.save();
        return new Response(JSON.stringify("User updated Successfully"), { status: 200 });
        
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify("Error Updating User"), { status: 500 });
    }
};

export const DELETE = async (request, { params }) => {
    const {userId} = await request.json();
    try {
        await connectToDB()

        const user = await User.findByIdAndDelete(userId)
        if (!user) return new Response(JSON.stringify("User Not Found"), { status: 404 });

        return new Response(JSON.stringify(user), { status: 200 })

    } catch (error) {
        return new Response(JSON.stringify("Internal Server Error"), { status: 500 });
    }
}