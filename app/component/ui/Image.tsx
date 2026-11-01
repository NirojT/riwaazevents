import NextImage, { type ImageProps } from "next/image";

const FILE_URL = process.env.NEXT_PUBLIC_FILE_URL;

/**
 * next/image, for photos that may come from the CMS. The site's own photos are optimised as usual.
 * An uploaded photo lives on the file server, so it is optimised only when that server is the one
 * named in NEXT_PUBLIC_FILE_URL (next.config.ts allows the same host). Any other address is shown
 * as uploaded: next/image throws on a host it doesn't know, which would take the section down with it.
 */
export default function Image({ unoptimized, ...props }: ImageProps) {
  const src = typeof props.src === "string" ? props.src : "";
  const elsewhere = /^https?:\/\//.test(src) && !(FILE_URL && src.startsWith(FILE_URL));
  return <NextImage {...props} unoptimized={unoptimized || elsewhere} />;
}
