import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import Replicate from "replicate";
import { increaseAPILimit, checkAPILimit } from "@/lib/apiLimit";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN, // ! for not undefined
});

export const POST = async (req: Request) => {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { prompt } = body;

    // console.log(messages);

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!prompt) {
      return new NextResponse("Music prompt is required!!", { status: 400 });
    }

    const freeTrial = await checkAPILimit();

    if (!freeTrial) {
      return new NextResponse("Free trial has expired!", { status: 403 });
    }

    const response = await replicate.run(
      "anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351",
      {
        input: {
          prompt: prompt,
        },
      }
    );

    await increaseAPILimit();

    return NextResponse.json(response, {
      status: 200,
    });
  } catch (error) {
    console.log("Music generation error", error);
    return new NextResponse("Error while generating music", {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
