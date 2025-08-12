import { analyze } from "@/app/services/analyze";
import { extractTextFromPdfString } from "@/app/utils/readFile";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { file, fileName } = await req.json();

    // Call the analyze function from your service

    console.log("Received file:");

    const textPdf = await extractTextFromPdfString(file);
    console.log("Extracted text:", textPdf);

    if (textPdf === null) {
      return NextResponse.json(
        { error: "Failed to extract text from PDF" },
        { status: 400 }
      );
    }

    const { result } = await analyze(textPdf, fileName);
    const cleanStr = result.replace(/^```json\s*|\s*```$/g, "");
    const obj = JSON.parse(cleanStr);
    return NextResponse.json(obj);
  } catch (error) {
    if ((error as Error).message.includes("429")) {
      return NextResponse.json(
        { error: "Quota exceeded. Please try again later." },
        { status: 429 }
      );
    }
    console.error("Error during file analysis:", error);
    return NextResponse.json(
      { error: "File analysis failed" },
      { status: 500 }
    );
  }
}
