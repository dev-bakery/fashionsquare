import React, { useState } from "react";

function BrandInfo({ data, isKeyword, checkedInputs, handleChange, currentTab }) {
  const { indexes, brands } = data || {};
  const isEnglish = currentTab?.language === "en";

  return indexes[isKeyword] !== undefined ? (
    <div className='box__brand-info'>
      <ul className='list__brand'>
        {indexes[isKeyword]?.map((v, i) => {
          const brand = brands[v] || brands[String(v)];
          if (!brand) return null;
          
          // 탭 언어에 따라 브랜드명 선택
          const brandName = isEnglish ? brand.brandNameEn : brand.brandNameKr;
          
          return (
            <li className='list-item' key={i}>
              <input
                type='checkbox'
                id={brand.brandSeq}
                onChange={(e) => {
                  handleChange(e.currentTarget.checked, brand.brandSeq);
                }}
                checked={checkedInputs.includes(brand.brandSeq) ? true : false}
              />
              <label htmlFor={brand.brandSeq}>{brandName} </label>
            </li>
          );
        })}
      </ul>
    </div>
  ) : (
    <div className='box__brand-notice'>
      <p className='text'>브랜드가 없습니다.</p>
      <span>다른 브랜드를 선택해주세요.</span>
    </div>
  );
}

export default BrandInfo;
