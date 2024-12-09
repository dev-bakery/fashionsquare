import React from "react";

const BottomNavigation = () => {
  return (
    <div>
      <div className='box__bottom-navigation' role='navigation' aria-label='하단 고정메뉴'>
        <div className='box__bottom-navigation-inner'>
          <ul className='list'>
            <li className='list-item'>
              <a href='//m.gmarket.co.kr' className='link link__home' aria-current='false'>
                <span className='for-a11y'>홈</span>
              </a>
            </li>
            <li className='list-item'>
              <button type='button' className='link link__search' aria-current='false'>
                <span className='for-a11y'>검색</span>
              </button>
            </li>
            <li className='list-item'>
              <a href='//my.gmarket.co.kr/ko/mo/Main' className='link link__myg' aria-current='false'>
                <span className='for-a11y'>마이지</span>
              </a>
            </li>
            <li className='list-item'>
              <a href='//m.gmarket.co.kr/n/recent-views' className='link link__rvh' aria-current='false'>
                <span className='for-a11y'>최근 쇼핑 활동</span>
                <span className='box__rvh-item'>
                  <img src='//gdimg.gmarket.co.kr/4099539671/still/400?ver=1725327668454' alt='최근 본 상품의 이미지' className='image' loading='lazy' decoding='async' />
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BottomNavigation;
