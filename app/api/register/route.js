import { connectToDB } from "@utils/database";
import CredentialsUser from '@models/credentials_user';

export const GET = async (request) => {
    try {
        await connectToDB()
        console.log(request)
        const { email, username, password } = request;
        const user = await CredentialsUser.findOne({ email });

        return new Response(JSON.stringify(prompts), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all prompts", { status: 500 })
    }
} 