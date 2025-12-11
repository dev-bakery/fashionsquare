import React, { useEffect } from "react";

const BrandFilter = ({ checkedInputs, setCheckedInputs, setBrandSetting, data, setIsFilteredItems, isFilteredItems, selectedBrandTabs, updateBrandParams, setSelectedBrandTabs }) => {
  const { brands } = data || {};
  const handleBrandReset = () => {
    setCheckedInputs([]);
    setBrandSetting(false);
    setIsFilteredItems([]);
    // selectedBrandTabs 초기화
    if (setSelectedBrandTabs) {
      setSelectedBrandTabs({});
    }
    // URL에서 브랜드 파라미터 제거
    if (updateBrandParams) {
      updateBrandParams([]);
    }
  };
  const handleDelete = (id) => {
    const updatedInputs = checkedInputs.filter((el) => el !== id);
    setCheckedInputs(updatedInputs);
    // 삭제된 브랜드의 탭 정보도 제거
    if (setSelectedBrandTabs) {
      setSelectedBrandTabs((prev) => {
        const next = { ...prev };
        delete next[id];
        delete next[String(id)];
        return next;
      });
    }
    // URL 파라미터 업데이트
    if (updateBrandParams) {
      updateBrandParams(updatedInputs);
    }
  };

  useEffect(() => {
    if (checkedInputs.length === 0) {
      setBrandSetting(false);
      setIsFilteredItems([]);
      // selectedBrandTabs 초기화
      if (setSelectedBrandTabs) {
        setSelectedBrandTabs({});
      }
    }
  }, [checkedInputs.length, setBrandSetting, setIsFilteredItems, setSelectedBrandTabs]);

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

          // 각 브랜드별로 저장된 탭 정보 사용
          const brandTab = selectedBrandTabs[v] || selectedBrandTabs[String(v)];
          const isEnglish = brandTab?.language === "en";

          // 탭 언어에 따라 브랜드명 선택
          const brandName = isEnglish ? brand.brandNameEn || brand.brandName : brand.brandNameKr || brand.brandName;

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
