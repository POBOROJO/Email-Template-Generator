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
    let textContent = "";
    if (typeof response.content === "string") {
      textContent = response.content;
    } else {
      // Assuming response.content is an array of content parts (MessageContentComplex[])
      textContent = response.content
        .filter(
          (part): part is { type: "text"; text: string } =>
            typeof part === "object" &&
            part !== null &&
            "type" in part &&
            part.type === "text" &&
            "text" in part &&
            typeof part.text === "string"
        )
        .map((part) => part.text)
        .join(""); // Join text parts. Subsequent .split('\n') will handle line breaks.
    }

    const subjectLines = textContent
      .split("\n")
      .filter((line: string) => line.trim() !== "")
      .map((line: string) =>
        line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      );

    return NextResponse.json({ subjectLines });
  } catch (error) {
    console.error("Subject Line Generation Error:", error);
    return NextResponse.json(
      { error: "Failed to generate subject lines. Please try again." },
      { status: 500 }
    );
  }
}
