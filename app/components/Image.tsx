import React from "react";

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  width: number;
  height: number;
  quality?: number;
}

export function Image({
  src,
  width,
  height,
  quality = 75,
  alt,
  ...props
}: ImageProps) {
  const isRemote = src.startsWith("http://") || src.startsWith("https://");
  const optimizedSrc = `/images?src=${encodeURIComponent(
    isRemote ? src : `/${src}`
  )}&w=${width}&q=${quality}`;

  return (
    <img
      src={optimizedSrc}
      width={width}
      height={height}
      alt={alt}
      {...props}
    />
  );
}
