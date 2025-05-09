import { SUBJECT_LINE_TEMPLATE } from "@/lib/templates";
import { PromptTemplate } from "@langchain/core/prompts";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const { description } = await req.json();

    const prompt = PromptTemplate.fromTemplate(SUBJECT_LINE_TEMPLATE);
    const model = new ChatGoogleGenerativeAI({
      modelName: "gemini-2.0-flash",
      temperature: 0.7,
    });
    const chain = prompt.pipe(model);
    const response = await chain.invoke({ description });

    // Convert markdown bold to HTML bold and filter empty lines
    const subjectLines = response.content
      .split("\n")
      .filter((line) => line.trim() !== "")
      .map((line) => line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>"));

    return NextResponse.json({ subjectLines });
  } catch (error) {
    console.error("Subject Line Generation Error:", error);
    return NextResponse.json(
      { error: "Failed to generate subject lines. Please try again." },
      { status: 500 }
    );
  }
}
 