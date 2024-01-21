import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import Replicate from "replicate";

import { increaseAPILimit, checkAPILimit } from "@/lib/apiLimit";
import { checkSubscription } from "@/lib/subscription";

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
    const isPro = await checkSubscription();

    if (!freeTrial && !isPro) {
      return new NextResponse("Free trial has expired!", { status: 403 });
    }

    const response = await replicate.run(
      "riffusion/riffusion:8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e05",
      {
        input: {
          prompt_a: prompt,
        },
      }
    );

    if (!isPro) await increaseAPILimit();

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
