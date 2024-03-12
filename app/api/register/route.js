import { connectToDB } from "@utils/database";
import User from '@models/user';

export const POST = async (request) => {
    try {
        await connectToDB()
        const { email, username, password } = await request.json();

        console.log(email)
        console.log(username)
        console.log(password)
        const emailUserExists = await User.findOne({ email });
        const userExists = await User.findOne({ username });

        if (!userExists && !emailUserExists) {
            try {
                await User.create({
                    email: email,
                    username: username,
                    password: password,
                  });

                return new Response(JSON.stringify("User Successfully created"), { status: 201 });
            }   catch (error) {
                return new Response("Failed to create new user", { status: 500 });
            }
        }
        
        if(emailUserExists){
            return new Response(JSON.stringify({ message: 'Email is already in use' }), { status: 400 });
        } else if (userExists){
            return new Response(JSON.stringify({ message: 'Username is already in use' }), { status: 400 });
        } 
        return new Response("Failed to create new user", { status: 500 });
    } catch (error) {
        return new Response("Failed to create new user", { status: 500 });
    }
}