import { readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * Encapsulates on-disk SVG reading and HTTP response creation.
 *
 * SRP  — one class, one responsibility: serving the favicon asset.
 * Encapsulation — file-system path is a private static constant;
 *                 callers only interact with toResponse().
 */
class FaviconService {
  private static readonly svgPath = join(process.cwd(), "src/assets/logo.svg");

  private static readSvg(): Buffer {
    return readFileSync(FaviconService.svgPath);
  }

  static toResponse(): Response {
    return new Response(FaviconService.readSvg(), {
      headers: { "Content-Type": "image/svg+xml" },
    });
  }
}

export function GET(): Response {
  return FaviconService.toResponse();
}
