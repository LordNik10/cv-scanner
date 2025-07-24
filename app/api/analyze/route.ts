import { analyze } from "@/app/services/analyze";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { file, fileName } = await req.json();

    // Call the analyze function from your service
    const { result } = await analyze(file, fileName);
    console.log("Analysis Result:", result);
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
