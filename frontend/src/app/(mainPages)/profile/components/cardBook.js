import React, { useEffect, useState } from "react";
import Image from "next/image";
const statusColors = {
  ожидает: "bg-yellow-100 text-yellow-800",
  опубликовано: "bg-green-100 text-green-800",
  отклонено: "bg-red-100 text-red-800",
};

export const BookCard = ({
  title,
  imgPath = "/images/KOn.png",
  author,
  status,
  onClick,
}) => {
  const [imgSrc, setImgSrc] = useState(imgPath);

  const handleImageError = () => {
    setImgSrc("/images/KOn.png");
  };

  return (
    <div
      className="flex flex-col w-59 p-[15px] pb-1 mx-1 transition-all duration-300 hover:bg-gray-100 rounded-lg overflow-hidden cursor-pointer "
      onClick={onClick}
    >
      <div className="h-70 bg-gray-300 flex items-center justify-center rounded-lg border border-[#F0F0F0]">
        <Image
          src={imgSrc}
          alt="Обложка книги"
          className="w-full h-full object-cover  rounded-lg"
          onError={handleImageError}
          width={59}
          height={70}
        />
      </div>

      <div className="p-4">
        <h3 className="text-lg font-medium truncate" title={title}>
          {title}
        </h3>
        <p className="text-gray-600">{author}</p>
        <span
          className={`text-xs px-2 py-1 rounded-full ${statusColors[status]}`}
        >
          {status}
        </span>
      </div>
    </div>
  );
};

export const BookViewCatalog = ({
  id,
  title,
  imgPath = "/images/KOn.png",
  author,
  status,
  onClick,
}) => {
  const [imgSrc, setImgSrc] = useState(imgPath);

  const handleImageError = () => {
    setImgSrc("/images/KOn.png");
  };
  return (
    <div
      key={id}
      className="flex flex-col w-59 p-[15px] pb-1 mx-1 transition-all duration-300 hover:bg-gray-100 rounded-lg overflow-hidden cursor-pointer "
      onClick={onClick}
    >
      <div className="h-70 bg-gray-300 flex items-center justify-center  rounded-lg border border-[#F0F0F0]">
        <Image
          src={imgSrc}
          alt="Обложка книги"
          className="w-full h-full object-cover rounded-lg"
          width={59}
          height={70}
        />
      </div>

      <div className="p-4">
        <h3 className="text-lg font-medium truncate" title={title}>
          {title}
        </h3>
        <p className="text-gray-600">{author}</p>
      </div>
    </div>
  );
};
export default BookCard;
