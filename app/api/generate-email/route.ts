import  {TEMPLATE}  from "@/lib/template";
import { PromptTemplate } from "@langchain/core/prompts";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(req: Request){
    try{
        const {recipientName, purpose, keyPoints} = await req.json();

        const prompt = PromptTemplate.fromTemplate(TEMPLATE);
        const model = new ChatGoogleGenerativeAI({
            modelName:"gemini-1.5-flash",
            temperature: 0.7,
        });
        const chain = prompt.pipe(model);
        const response = await chain.invoke({
            recipientName,
            purpose,
            keyPoints: keyPoints.split(",").join("\n- "),
        });

        return NextResponse.json({
            email: response.content,
        })
    }catch(error){
        console.error("Generation Error:", error);
        return NextResponse.json(
            { error: "Failed to generate email. Please try again." },
            { status: 500 }
        );
    }
} 