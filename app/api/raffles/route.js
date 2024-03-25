import Raffles from "@models/raffles";
import { connectToDB } from "@utils/database";

export const GET = async (request) => {
  try {
    await connectToDB();
    const raffles = await Raffles.find({});
    console.log("Raffles", raffles);

    return new Response(JSON.stringify(raffles), {
      status: 200,
      headers: {
        'Cache-Control': 'no-store', // Prevents caching of the response
      },
    });
  } catch (error) {
    return new Response(JSON.stringify("Failed to fetch all raffles"), {
      status: 500,
    });
  }
};

export const PATCH = async (request) => {

  try {
      await connectToDB();
      const raffles = await Raffles.find({});

      return new Response(JSON.stringify(raffles), {
        status: 200,
        headers: {
          'Cache-Control': 'no-store', // Prevents caching of the response
        },
      });
  } catch (error) {
      return new Response(JSON.stringify("Failed to fetch all raffles"), {
        status: 500,
      });
    }
  };
