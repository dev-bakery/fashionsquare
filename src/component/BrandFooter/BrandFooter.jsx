import React from "react";

function BrandFooter({ checkedInputs, data, setCheckedInputs, setBrandSetting, setIsFilteredItems, isFilteredItems, updateBrandParams, selectedBrandTabs }) {
  const { brands } = data || {};

  const handleDelete = (id) => {
    setCheckedInputs(checkedInputs.filter((el) => el !== id));
  };
  const handleAllDelete = () => {
    setCheckedInputs([]);
  };
  const handleItemSet = () => {
    setBrandSetting(true);
    setIsFilteredItems(isFilteredItems.sort((a, b) => b.buyCount - a.buyCount));
    // URL 파라미터 업데이트
    if (updateBrandParams && checkedInputs.length > 0) {
      updateBrandParams(checkedInputs);
    }
  };
  return (
    <div className='box__brand-footer'>
      {checkedInputs.length !== 0 && (
        <div className='box__filter-wrap'>
          <div className='box__filter'>
            {checkedInputs.map((v, i) => {
              const brand = brands[v] || brands[String(v)];
              if (!brand) return null;
              
              // 각 브랜드별로 저장된 탭 정보 사용
              const brandTab = selectedBrandTabs[v] || selectedBrandTabs[String(v)];
              const isEnglish = brandTab?.language === "en";
              
              // 탭 언어에 따라 브랜드명 선택
              const brandName = isEnglish ? (brand.brandNameEn || brand.brandName) : (brand.brandNameKr || brand.brandName);
              
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
