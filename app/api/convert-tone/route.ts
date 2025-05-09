import { TONE_CONVERTER_TEMPLATE } from "@/lib/templates";
import { PromptTemplate } from "@langchain/core/prompts";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const { emailText, tone } = await req.json();

    const prompt = PromptTemplate.fromTemplate(TONE_CONVERTER_TEMPLATE);
    const model = new ChatGoogleGenerativeAI({
      modelName: "gemini-2.0-flash",
      temperature: 0.7,
    });
    const chain = prompt.pipe(model);
    const response = await chain.invoke({ emailText, tone });

    return NextResponse.json({ convertedEmail: response.content });
  } catch (error) {
    console.error("Tone Conversion Error:", error);
    return NextResponse.json(
      { error: "Failed to convert email tone. Please try again." },
      { status: 500 }
    );
  }
}
