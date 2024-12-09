/* eslint-disable @next/next/no-img-element */
import React from "react";
// import Image from "next/image";

const ItemContainer = ({ isFilteredItems }) => {
  return (
    <div className='box__itemcard-wrap'>
      {isFilteredItems.map((v, i) => {
        const { itemName, itemUrl, imageUrl, sdBrandName, itemPrice, sellPrice, isBigSmileItem, lmos, buyCount, reviewPoint, groupItemCnt, groupNo, deliveryText, isCartVisible, isAdult, isLmoOfficialSeller, isFashionSquareSeller } = v || {};
        return (
          <div key={i} className='box__itemcard-container'>
            <div className='box__itemcard-body'>
              <div className='box__itemcard-inner'>
                <a href={itemUrl} className='link__itemcard'>
                  <span className='box__itemcard-img'>
                    {isBigSmileItem && <img src='//image.gmarket.co.kr/hanbando/202410/91fa2116-78c1-4d05-992a-e1e1be12e6ff.png' className='image__itemcard-tag' alt='빅스마일데이' loading='lazy' />}
                    {imageUrl && <img src={imageUrl} className='image__itemcard' alt='' loading='lazy' />}
                  </span>
                </a>
                <div className='box__itemcard-info'>
                  <a href={itemUrl} className='link__itemcard-info'>
                    <span className='box__itemcard-title-area'>
                      {isFashionSquareSeller && (
                        <span className='text__brand'>
                          <span className='box__itemcard-fashion-tag'>
                            <img className='image' src='//script.gmarket.co.kr/build/mobile/image/single/fashionsquare/component/itemcard/logo_fashionsquare_3x.png' alt='패션스퀘어 상품' loading='lazy' />
                          </span>
                          <span className='text'>{sdBrandName}</span>
                        </span>
                      )}
                      <span className='text__title'>{itemName}</span>
                    </span>
                    <span className='box__itemcard-price-area'>
                      <span className='box__price-seller'>
                        <strong className='text__price-seller'>{itemPrice.toLocaleString("ko-KR")}</strong>
                        <span className='text__unit'>원</span>
                      </span>
                    </span>
                    {deliveryText && (
                      <div className='box__itemcard-delivery'>
                        <span className='text__delivery'>{deliveryText}</span>
                      </div>
                    )}
                  </a>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ItemContainer;
