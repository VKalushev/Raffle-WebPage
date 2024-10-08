import { connectToDB } from "@utils/database";
import User from '@models/user';
import bcrypt from 'bcrypt';

export const POST = async (request) => {
    try {
        await connectToDB()
        const { email, username, password } = await request.json();
        if(!username) {
            try {
                let guestUser = undefined;
                try {
                    guestUser = await User.create({email: email});
                } catch (error) {
                    console.log(error)
                }
                return new Response(JSON.stringify(guestUser), { status: 201 });
            }   catch (error) {
                console.log(error)
                return new Response(JSON.stringify("Failed to create new guest user"), { status: 500 });
            }
        } 
        const emailUserExists = await User.findOne({ email });
        const userExists = await User.findOne({ username });
        
        if (!userExists && !emailUserExists) {
            try {
                const hashedPassword = await bcrypt.hash(password, 10);
                try {
                    await User.create({
                        email: email,
                        username: username,
                        password: hashedPassword,
                    });
                } catch (error) {
                    console.log(error)
                }
                return new Response(JSON.stringify("User Successfully created"), { status: 201 });
            }   catch (error) {
                return new Response(JSON.stringify("Failed to create new user"), { status: 500 });
            }
        } 
        
        if(emailUserExists){
            return new Response(JSON.stringify('Email is already in use' ), { status: 400 });
        } else if (userExists){
            return new Response(JSON.stringify('Username is already in use'), { status: 400 });
        } 
        return new Response(JSON.stringify("Failed to create new user"), { status: 500 });
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify("Failed to create new user"), { status: 500 });
    }
}