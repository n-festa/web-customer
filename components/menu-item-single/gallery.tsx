import React from "react";

type GalleryMenuItemType = {
    images: string[];
};

const Gallery = ({ images }: GalleryMenuItemType) => {
    const featImage = images[0];
    return <div>Gallery</div>;
};

export default Gallery;
