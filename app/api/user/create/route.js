import { connectToDB } from "@utils/database";
import User from '@models/user';
import bcrypt from 'bcrypt';

export const POST = async (request) => {
    try {
        await connectToDB()
        const { email, username, password } = await request.json();
        console.log("Test");
        const emailUserExists = await User.findOne({ email });
        const userExists = await User.findOne({ username });
        console.log(emailUserExists)
        console.log(userExists)
        if (!userExists && !emailUserExists) {
            console.log("Test 1");
            try {
                const hashedPassword = await bcrypt.hash(password, 10);
                console.log("Test 2");
                try {
                    await User.create({
                        email: email,
                        username: username,
                        password: hashedPassword,
                    });
                } catch (error) {
                    console.log(error)
                }
                
                
                console.log("Test 3");
                return new Response("User Successfully created", { status: 201 });
            }   catch (error) {
                return new Response("Failed to create new user", { status: 500 });
            }
        }
        console.log("Test 4");
        
        if(emailUserExists){
            console.log("Test 5");
            return new Response(JSON.stringify('Email is already in use' ), { status: 400 });
        } else if (userExists){
            console.log("Test 6");
            return new Response(JSON.stringify('Username is already in use'), { status: 400 });
        } 
        console.log("Test 7");
        return new Response("Failed to create new user", { status: 500 });
    } catch (error) {
        console.log(error)
        return new Response("Failed to create new user", { status: 500 });
    }
}