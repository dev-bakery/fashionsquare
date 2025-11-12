import React from "react";
import ItemCardImage from "./ItemCardImage";
import ItemCardInfo from "./ItemCardInfo";

const ItemCard = ({ item }) => {
  const {
    itemNo,
    itemName,
    itemUrl,
    imageUrl,
    sdBrandName,
    itemPrice,
    deliveryText,
    buyCount,
    reviewPoint,
    lmos,
    groupItemCnt,
    groupNo,
    hotSignalTitle,
    isBigSmileItem,
    isFashionSquareSeller,
    isLmoOfficialSeller,
    index,
    currentPageNo,
    isCartVisible,
  } = item;
  return (
    <div className='box__itemcard-container'>
      <div className='box__itemcard-body'>
        <div className='box__itemcard-inner'>
          <a href={itemUrl} className='link__itemcard'>
            <ItemCardImage
              imageUrl={imageUrl}
              itemName={itemName}
              isBigSmileItem={isBigSmileItem}
            />
          </a>
          <div className='box__itemcard-info'>
            <ItemCardInfo
              itemUrl={itemUrl}
              sdBrandName={sdBrandName}
              isFashionSquareSeller={isFashionSquareSeller}
              isLmoOfficialSeller={isLmoOfficialSeller}
              hotSignalTitle={hotSignalTitle}
              itemName={itemName}
              itemPrice={itemPrice}
              deliveryText={deliveryText}
              buyCount={buyCount}
              reviewPoint={reviewPoint}
              lmos={lmos}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
