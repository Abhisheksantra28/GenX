import { auth } from "@clerk/nextjs";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI("AIzaSyDxIsfw_QiGd5uOYDf2-KmK-Y-VDyqYh_M");

export const POST = async (req: Request) => {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { messages } = body;

    // console.log(messages[0].parts);

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!messages) {
      return new NextResponse("Messages are required!!", { status: 400 });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const chat = model.startChat();

    const result = await chat.sendMessageStream(messages[0].parts);
    const response = await result.response;
    const text = response.text();
    // console.log(text);

    return NextResponse.json(text);
  } catch (error) {
    console.log("coversation error", error);
    return new NextResponse("Gen ai api error", { status: 500 });
  }
};
