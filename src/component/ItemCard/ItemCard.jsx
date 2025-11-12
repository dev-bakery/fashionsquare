import React from "react";
import ItemCardImage from "./ItemCardImage";

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
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
