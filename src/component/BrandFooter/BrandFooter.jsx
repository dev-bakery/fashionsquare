import React from "react";

function BrandFooter({ checkedInputs, data, setCheckedInputs, setBrandSetting, setIsFilteredItems, isFilteredItems, setIsAreacode }) {
  const { brands } = data || {};

  const handleDelete = (id) => {
    setCheckedInputs(checkedInputs.filter((el) => el !== id));
  };
  const handleAllDelete = () => {
    setCheckedInputs([]);
    setIsAreacode("200005781");
  };
  const handleItemSet = () => {
    setBrandSetting(true);
    setIsFilteredItems(isFilteredItems.sort((a, b) => b.buyCount - a.buyCount));
  };
  return (
    <div className='box__brand-footer'>
      {checkedInputs.length !== 0 && (
        <div className='box__filter-wrap'>
          <div className='box__filter'>
            {checkedInputs.map((v, i) => {
              return (
                <span className='text__filter' key={i}>
                  {brands[v].brandName}
                  <button
                    type='button'
                    className='button__delete'
                    onClick={() => {
                      handleDelete(v);
                    }}>
                    <span className='for-a11y'>삭제</span>
                  </button>
                </span>
              );
            })}
          </div>
          <div className='box__reset'>
            <button type='button' className='button__reset' onClick={handleAllDelete}>
              <span className='for-a11y'>선택 초기화</span>
            </button>
          </div>
        </div>
      )}
      <div className='box__button'>
        <button type='button' className='button__cancel'>
          취소
        </button>
        <button type='button' className='button__apply' onClick={handleItemSet}>
          적용
        </button>
      </div>
    </div>
  );
}

export default BrandFooter;
