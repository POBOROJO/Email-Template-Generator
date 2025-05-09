import { COLD_EMAIL_TEMPLATE } from "@/lib/templates";
import { PromptTemplate } from "@langchain/core/prompts";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const {
      recipientName,
      recipientCompany,
      yourName,
      yourCompany,
      productService,
      keyBenefits,
      callToAction,
    } = await req.json();

    const prompt = PromptTemplate.fromTemplate(COLD_EMAIL_TEMPLATE);
    const model = new ChatGoogleGenerativeAI({
      modelName: "gemini-2.0-flash",
      temperature: 0.7,
    });
    const chain = prompt.pipe(model);
    const response = await chain.invoke({
      recipientName,
      recipientCompany,
      yourName,
      yourCompany,
      productService,
      keyBenefits,
      callToAction,
    });

    return NextResponse.json({ email: response.content });
  } catch (error) {
    console.error("Cold Email Generation Error:", error);
    return NextResponse.json(
      { error: "Failed to generate cold email. Please try again." },
      { status: 500 }
    );
  }
}
