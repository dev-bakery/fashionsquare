import React from "react";

const ItemCardImage = ({ isBigSmileItem, imageUrl, itemName }) => {
  return (
    <span className='box__itemcard-img'>
      {isBigSmileItem && (
        <img
          src='//pics.gmarket.co.kr/mobile/single/kr/promotion/bigs/tag/tag.png'
          className='image__itemcard-tag'
          alt='빅세일'
        />
      )}
      <img key={imageUrl} src={imageUrl} className='image__itemcard' alt='' />
    </span>
  );
};

export default ItemCardImage;
