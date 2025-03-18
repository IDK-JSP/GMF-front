import React from "react";
import withLoadingAndError from "../hoc/WithLoadingAndError";
import useImage from "../../hook/useImage";
import ImageSkeleton from "../skeleton/ImageSkeleton";

interface ImageLoaderProps {
    imgUrl: string;
    title: string;
}

const ImageLoader: React.FC<ImageLoaderProps> = ({ imgUrl, title }) => {
    const { image, isLoading, error } = useImage(imgUrl);

    return withLoadingAndError({
        isLoading,
        error,
        data: image ? [image] : [],
        SkeletonComponent: ImageSkeleton,
        children: (data) => (
            <img
                src={data[0] || "https://placehold.co/500x500?text=No\nImage"}
                alt={title}
                className="recipe-card-image"
            />
        ),
    });
};

export default ImageLoader;
