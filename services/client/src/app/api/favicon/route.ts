import { readFileSync } from "node:fs";
import { join } from "node:path";

export function GET() {
  const svg = readFileSync(join(process.cwd(), "src/assets/logo.svg"));
  return new Response(svg, {
    headers: { "Content-Type": "image/svg+xml" },
  });
}
