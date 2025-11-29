import React, { useEffect } from "react";

const BrandFilter = ({ checkedInputs, setCheckedInputs, setBrandSetting, data, setIsFilteredItems, isFilteredItems, setIsAreacode, currentTab }) => {
  const { brands } = data || {};
  const isEnglish = currentTab?.language === "en";
  const handleBrandReset = () => {
    setCheckedInputs([]);
    setBrandSetting(false);
    setIsFilteredItems([]);
    setIsAreacode("200005781");
  };
  const handleDelete = (id) => {
    // checkedInputs만 업데이트하면 useEffect가 자동으로 필터링 처리
    setCheckedInputs(checkedInputs.filter((el) => el !== id));
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
          const brand = brands[v] || brands[String(v)];
          if (!brand) return null;

          // 탭 언어에 따라 브랜드명 선택
          const brandName = isEnglish ? brand.brandNameEn : brand.brandNameKr;

          return (
            <span className='text__filter' key={i}>
              {brandName}
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
