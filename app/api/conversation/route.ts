import { auth } from "@clerk/nextjs";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

import { increaseAPILimit, checkAPILimit } from "@/lib/apiLimit";
import { checkSubscription } from "@/lib/subscription";

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY as string);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

export const POST = async (req: Request) => {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { messages } = body;

    // console.log(messages);

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!messages) {
      return new NextResponse("Messages are required!!", { status: 400 });
    }

    const freeTrial = await checkAPILimit();
    const isPro = await checkSubscription();

    if (!freeTrial && !isPro) {
      return new NextResponse("Free trial has expired!", { status: 403 });
    }

    const chat = model.startChat();

    const result = await chat.sendMessage(messages[messages.length - 1].parts);
    const response = result.response;
    const text = response.text();

    if (!isPro) await increaseAPILimit();

    return NextResponse.json(text, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log("coversation error", error);
    return new NextResponse("Gen ai api error", {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
