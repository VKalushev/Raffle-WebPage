import Raffles from "@models/raffles";
import { connectToDB } from "@utils/database";

export const GET = async (request) => {
    try {
        await connectToDB()

        const raffles = await Raffles.find({})

        return new Response(JSON.stringify(raffles), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all raffles failed", { status: 500 })
    }
} 