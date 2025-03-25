import React, { useState } from "react";

interface ImageLoaderProps {
  imgUrl: string;
  imgDefault?: string;
  title: string;
  classCss?: string;
}

const ImageLoader: React.FC<ImageLoaderProps> = ({
  imgUrl,
  imgDefault = "/default.png", // chemin vers ton image de secours
  title,
  classCss = "",
}) => {
  const [src, setSrc] = useState(imgUrl);

  return (
    <img
      src={src}
      alt={title}
      className={classCss}
      onError={() => setSrc(imgDefault)}
      loading="lazy"
    />
  );
};

export default ImageLoader;
