import { NextResponse } from "next/server";
import { resultMap } from "../../analyze/route";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  console.log({ resultMap, id });

  if (!id || !resultMap.has(id)) {
    return NextResponse.json({ error: "Report not found" }, { status: 404 });
  }

  const report = resultMap.get(id);
  const cleanStr = report.replace(/^```json\s*|\s*```$/g, "");
  const obj = JSON.parse(cleanStr);
  return NextResponse.json(obj);
}
