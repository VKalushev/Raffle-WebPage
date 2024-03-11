import { connectToDB } from "@utils/database";
import CredentialsUserSchema from '@models/credentials_user';
import GoogleUser from '@models/google_user';

export const POST = async (request) => {
    try {
        await connectToDB()
        const { email, username, password } = await request.json();

        const googleEmailExsists = await GoogleUser.findOne({ username });
        const emailUserExists = await CredentialsUser.findOne({ email });
        const userExists = await CredentialsUser.findOne({ username });

        console.log('Test: 1');
        if (!userExists && !emailUserExists && !googleEmailExsists) {
            console.log('Test: 2')
            try {
                await CredentialsUserSchema.create({
                    email: email,
                    username: username,
                    password: password,
                    image: "",
                });
                
                return new Response(JSON.stringify(username), { status: 201 });
            }   catch (error) {
                return new Response("Failed to create new user", { status: 500 });
            }
        }
        
        console.log('Test: 3')
        console.log(Boolean(emailUserExists))
        console.log(Boolean(userExists))
        console.log(Boolean(googleEmailExsists))
        if(emailUserExists){
            return new Response(JSON.stringify({ message: 'Email is already in use' }), { status: 400 });
        } else if (userExists){
            return new Response(JSON.stringify({ message: 'Username is already in use' }), { status: 400 });
        } else if (googleEmailExsists) {
            return new Response(JSON.stringify({ message: 'Google Login is registered with this email' }), { status: 400 });
        } else {
            return new Response("Failed to create new user", { status: 500 });
        }
    } catch (error) {
        return new Response("Failed to create new user", { status: 500 });
    }
}