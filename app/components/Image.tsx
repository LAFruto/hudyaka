import React from "react";

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  width?: number;
  height?: number;
  quality?: number;
  fill?: boolean;
  sizes?: string;
}

export function Image({
  src,
  width,
  height,
  quality = 90,
  alt,
  fill,
  sizes,
  ...props
}: ImageProps) {
  const isRemote = src.startsWith("http://") || src.startsWith("https://");
  const optimizedSrc = `/images?src=${encodeURIComponent(
    isRemote ? src : `/${src}`
  )}${width ? `&w=${width}` : ""}${height ? `&h=${height}` : ""}&q=${quality}`;

  const imgProps: React.ImgHTMLAttributes<HTMLImageElement> = {
    src: optimizedSrc,
    alt,
    ...props,
  };

  if (fill) {
    imgProps.style = {
      ...imgProps.style,
      position: "absolute",
      height: "100%",
      width: "100%",
      inset: "0px",
      objectFit: "cover",
    };
  } else {
    if (width) imgProps.width = width;
    if (height) imgProps.height = height;
  }

  if (sizes) {
    imgProps.sizes = sizes;
  }

  return <img {...imgProps} alt={alt} />;
}
