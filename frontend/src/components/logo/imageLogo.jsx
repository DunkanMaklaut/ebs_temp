import React from 'react';
import './imageLogo.css';
import Image from 'next/image';

const ImageComponent = ({ image }) => {
  return (
    <Image
      src={image}
      alt="Логотип"
      width={50}
      height={50}
    />
  );
};

export default ImageComponent;