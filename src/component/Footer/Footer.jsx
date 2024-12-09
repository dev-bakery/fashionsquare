import React from "react";

const Footer = () => {
  return (
    <div className='box__footer'>
      <div className='box__footer-content'>
        <div className='box__footer-content-inner'>
          <p className='box__footer-info'>G마켓은 통신판매중개자이며 통신판매의 당사자가 아닙니다. 따라서 G마켓은 상품·거래 정보 및 가격에 대하여 책임을 지지 않습니다.</p>
        </div>
      </div>
      <button type='button' className='gds-top-button gds-js-top-button'>
        <i className='gds-icon gds-icon-arrow-up-medium-gray900'></i>
        <span className='for-a11y'>위로 가기</span>
      </button>
    </div>
  );
};

export default Footer;
