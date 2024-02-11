import React from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import galleryImg from "./Gallery";

export default function MasonryTemplate() {
  return (
    <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
      <Masonry gutter="1rem">
        {galleryImg.map((img, index) => (
          <img
            src={img}
            alt=""
            className="masonry_img"
            key={index}
            style={{ width: "100%", display: "block", borderRadius: "10px" }}
          />
        ))}
      </Masonry>
    </ResponsiveMasonry>
  );
}
