import { auth } from "@clerk/nextjs";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY as string);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });


const instruction : string = "You are a code generator . you must answer only in markdown code snippets, use code comments for explanations and generate code accordingly for the givn prompt "

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

    const chat = model.startChat();

    const result = await chat.sendMessage( instruction+messages[messages.length - 1].parts);
    const response = result.response;
    const text = response.text();
  

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
