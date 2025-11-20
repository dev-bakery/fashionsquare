import React from "react";
import Image from "next/image";

const SortLayer = () => {
  return (
    <div className='box__sorting-option box__sorting-option--active' role='dialog' aria-modal='true'>
      <div className='box__dimmed' aria-hidden='true'></div>
      <div className='box__option-content'>
        <p className='text__title'>정렬</p>
        <button type='button' className='button__close'>
          닫기
        </button>
        <ul className='list__sorting-option'>
          <li className='list-item list-item--active'>
            <a className='link' role='button' aria-label='판매 인기순으로 정렬하기' href='s=1'>
              <Image src='//script.gmarket.co.kr/build/mobile/image/single/fashionsquare/component/sorting/icon_sort_hot_3x.png' loading='lazy' decoding='async' width='32' height='32' className='image' alt='판매 인기순' />
              판매 인기순
            </a>
          </li>
          <li className='list-item'>
            <a className='link' role='button' aria-label='낮은 가격순으로 정렬하기' href='s=2' data-montelena-acode='200005782' data-montelena-page_type='2'>
              <Image src='//script.gmarket.co.kr/build/mobile/image/single/fashionsquare/component/sorting/icon_sort_low_3x.png' loading='lazy' decoding='async' width='32' height='32' className='image' alt='낮은 가격순' />
              낮은 가격순
            </a>
          </li>
          <li className='list-item'>
            <a className='link' role='button' aria-label='높은 가격순으로 정렬하기' href='s=3' data-montelena-acode='200005783' data-montelena-page_type='2'>
              <Image src='//script.gmarket.co.kr/build/mobile/image/single/fashionsquare/component/sorting/icon_sort_high_3x.png' loading='lazy' decoding='async' width='32' height='32' className='image' alt='높은 가격순' />
              높은 가격순
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SortLayer;
