import { LoaderFunction } from "@remix-run/node";
import fs from "fs/promises";
import path from "path";
import sharp from "sharp";

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const src = url.searchParams.get("src");
  const width = url.searchParams.get("w");
  const quality = url.searchParams.get("q");

  if (!src || !width || !quality) {
    return new Response("Missing parameters", { status: 400 });
  }

  try {
    let imageBuffer: Buffer;

    if (src.startsWith("http://") || src.startsWith("https://")) {
      // Remote image
      const imageResponse = await fetch(src);
      imageBuffer = Buffer.from(await imageResponse.arrayBuffer());
    } else {
      // Local image
      const imagePath = path.join(process.cwd(), "public", src);
      imageBuffer = await fs.readFile(imagePath);
    }

    const optimizedImage = await sharp(imageBuffer)
      .resize(parseInt(width))
      .webp({ quality: parseInt(quality) })
      .toBuffer();

    return new Response(optimizedImage, {
      headers: {
        "Content-Type": "image/webp",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    return new Response("Error processing image", { status: 500 });
  }
};

export default function Images() {
  return;
}
