import React, { useEffect } from "react";

const BrandFilter = ({ checkedInputs, setCheckedInputs, setBrandSetting, data, setIsFilteredItems, isFilteredItems, setIsAreacode }) => {
  const { brands } = data || {};
  const handleBrandReset = () => {
    setCheckedInputs([]);
    setBrandSetting(false);
    setIsFilteredItems([]);
    setIsAreacode("200005781");
  };
  const handleDelete = (id) => {
    setCheckedInputs(checkedInputs.filter((el) => el !== id));
    setIsFilteredItems(isFilteredItems.filter((el) => el.brandNo !== id));
  };

  useEffect(() => {
    if (checkedInputs.length === 0) {
      setBrandSetting(false);
      setIsFilteredItems([]);
    }
  }, [checkedInputs.length === 0]);

  return (
    <div className='box__filter-wrap box__filter-wrap--result'>
      <div className='box__reset'>
        <button type='button' className='button__edit' onClick={handleBrandReset}>
          <span className='for-a11y'>브랜드 선택</span>
        </button>
      </div>
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
    </div>
  );
};

export default BrandFilter;
