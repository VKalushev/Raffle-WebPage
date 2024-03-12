import Prompt from "@models/raffles";
import { connectToDB } from "@utils/database";

export const POST = async (request) => {
    try {
        await connectToDB()
        const { reward, time, ticketPrice } = await request.json();
        console.log(reward)
        console.log(time)
        console.log(ticketPrice)

        // const prompts = await Prompt.find({})

        return new Response(JSON.stringify(prompts), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all prompts", { status: 500 })
    }
} 