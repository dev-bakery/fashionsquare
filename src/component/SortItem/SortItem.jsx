/* eslint-disable @next/next/no-img-element */
import classNames from "classnames";
import React, { useState } from "react";

const SortItem = ({ handlePriceLow, handlePriceHigh, isAreacode, handleBuycount }) => {
  const [isSortLayer, setIsSortLayer] = useState(false);

  return (
    <div className='box__sorting-information'>
      <div className='box__search-result'>
        <span className='text__item-count text__emphasis'>346</span>
        <span className='text'>개의 검색 결과</span>
      </div>
      <div className='box__sorting'>
        <button
          type='button'
          className='button__sorting'
          title='정렬 방식을 변경하려면 버튼을 클릭해 주세요.'
          aria-haspopup='dialog'
          onClick={() => {
            setIsSortLayer(true);
          }}>
          정렬
        </button>
        <div className={classNames("box__sorting-option", isSortLayer && "box__sorting-option--active")} role='dialog' aria-modal='true'>
          <div
            className='box__dimmed'
            aria-hidden='true'
            onClick={() => {
              setIsSortLayer(false);
            }}></div>
          <div className='box__option-content' tabIndex='-1'>
            <p className='text__title'>정렬</p>
            <button
              type='button'
              className='button__close'
              onClick={() => {
                setIsSortLayer(false);
              }}>
              닫기
            </button>
            <ul className='list__sorting-option'>
              <li className={classNames("list-item", isAreacode === "200005781" && "list-item--active")}>
                <a className='link' role='button' aria-label='판매 인기순으로 정렬하기' href='' data-montelena-acode='200005781' onClick={(e) => handleBuycount(e, "200005781")}>
                  <img src='//script.gmarket.co.kr/build/mobile/image/single/fashionsquare/component/sorting/icon_sort_hot_3x.png' loading='lazy' decoding='async' width='32' height='32' className='image' alt='판매 인기순' />
                  판매 인기순
                </a>
              </li>
              <li className={classNames("list-item", isAreacode === "200005782" && "list-item--active")}>
                <a className='link' role='button' aria-label='낮은 가격순으로 정렬하기' href='' data-montelena-acode='200005782' onClick={(e) => handlePriceLow(e, "200005782")}>
                  <img src='//script.gmarket.co.kr/build/mobile/image/single/fashionsquare/component/sorting/icon_sort_low_3x.png' loading='lazy' decoding='async' width='32' height='32' className='image' alt='낮은 가격순' />
                  낮은 가격순
                </a>
              </li>
              <li className={classNames("list-item", isAreacode === "200005783" && "list-item--active")}>
                <a className='link' role='button' aria-label='높은 가격순으로 정렬하기' href='' data-montelena-acode='200005783' onClick={(e) => handlePriceHigh(e, "200005783")}>
                  <img src='//script.gmarket.co.kr/build/mobile/image/single/fashionsquare/component/sorting/icon_sort_high_3x.png' loading='lazy' decoding='async' width='32' height='32' className='image' alt='높은 가격순' />
                  높은 가격순
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SortItem;
