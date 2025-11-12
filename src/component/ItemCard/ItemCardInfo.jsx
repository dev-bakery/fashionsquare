import React from "react";

const HotSignalInfo = ({ hotSignalTitle }) => {
  if (!hotSignalTitle) return null;
  return (
    <span className='box__itemcard-best-tag'>
      <span className='text__best-tag'>{hotSignalTitle}</span>
    </span>
  );
};

const ItemCardTitle = ({
  itemName,
  isLmoOfficialSeller,
  sdBrandName,
  isFashionSquareSeller,
}) => {
  return (
    <span className='box__itemcard-title-area'>
      <span className='text__brand'>
        {isFashionSquareSeller && (
          <span className='box__itemcard-fashion-tag'>
            <img
              className='image'
              src={`//script.gmarket.co.kr/build/mobile/image/single/fashionsquare/component/itemcard/logo_fashionsquare_3x.png`}
              alt='패션스퀘어 상품'
            />
          </span>
        )}
        {sdBrandName && <span className='text'>{sdBrandName}</span>}
        {isLmoOfficialSeller && (
          <span className='box__official-tag'>
            공식
            <span className='for-a11y'>셀러</span>
          </span>
        )}
      </span>
      <span className='text__title' title={itemName}>
        {itemName}{" "}
      </span>
    </span>
  );
};

const ItemCardInfo = ({
  id,
  itemUrl,
  sdBrandName,
  isLmoOfficialSeller,
  isFashionSquareSeller,
  hotSignalTitle,
  itemName,
  itemPrice,
  deliveryText,
  buyCount,
  reviewPoint,
  lmos,
}) => {
  return (
    <a href={itemUrl} className='link__itemcard-info'>
      <HotSignalInfo hotSignalTitle={hotSignalTitle} />
      <ItemCardTitle
        itemName={itemName}
        isFashionSquareSeller={isFashionSquareSeller}
        isLmoOfficialSeller={isLmoOfficialSeller}
        sdBrandName={sdBrandName}
      />
    </a>
  );
};

export default ItemCardInfo;
