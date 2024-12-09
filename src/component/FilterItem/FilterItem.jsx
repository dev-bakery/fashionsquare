import React from "react";

const FilterItem = () => {
  return (
    <div className='box__filter-item'>
      <div className='box__filter-item-inner'>
        <div className='box__filter-quick'>
          <div className='box__quick-item'>
            <input type='checkbox' name='t:n' id='checkbox-simple-t:n-' className='form__input-checkbox' value='' />
            <label htmlFor='checkbox-simple-t:n-' className='form__label'>
              신상품
            </label>
          </div>
          <div className='box__quick-item'>
            <input type='checkbox' name='d:f' id='checkbox-simple-d:f-' className='form__input-checkbox' value='' />
            <label htmlFor='checkbox-simple-d:f-' className='form__label'>
              무료배송
            </label>
          </div>
          <button type='button' className='button__filter' aria-haspopup='dialog' aria-label='필터 레이어 열기'>
            필터
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterItem;
