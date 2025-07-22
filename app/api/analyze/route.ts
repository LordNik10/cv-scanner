import { analyze } from "@/app/services/analyze";
import { NextResponse } from "next/server";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const resultMap = new Map<string, any>();

export async function POST(req: Request) {
  const { file, fileName } = await req.json();

  // Call the analyze function from your service
  const { result } = await analyze(file, fileName);
  console.log("Analysis Result:", result);

  const reportId = crypto.randomUUID();
  resultMap.set(reportId, result);
  return NextResponse.json({ reportId });
}

export { resultMap };
