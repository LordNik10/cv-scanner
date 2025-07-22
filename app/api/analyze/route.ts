import { analyze } from "@/app/services/analyze";
import { NextResponse } from "next/server";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const resultMap = new Map<string, any>();

export async function POST(req: Request) {
  try {
    const { file, fileName } = await req.json();

    // Call the analyze function from your service
    const { result } = await analyze(file, fileName);
    console.log("Analysis Result:", result);

    const reportId = crypto.randomUUID();
    resultMap.set(reportId, result);
    return NextResponse.json({ reportId });
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

export { resultMap };
