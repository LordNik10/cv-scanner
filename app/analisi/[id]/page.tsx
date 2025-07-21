import { Report } from "@/components/Report";

export default async function AnalisiPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <Report id={id} />;
}
