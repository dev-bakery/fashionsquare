import React, { useState } from "react";

function BrandInfo({ data, isKeyword, checkedInputs, handleChange }) {
  const { indexes, brands } = data || {};

  return indexes[isKeyword] !== undefined ? (
    <div className='box__brand-info'>
      <ul className='list__brand'>
        {indexes[isKeyword]?.map((v, i) => {
          return (
            <li className='list-item' key={i}>
              <input
                type='checkbox'
                id={brands[v].brandSeq}
                onChange={(e) => {
                  handleChange(e.currentTarget.checked, brands[v].brandSeq);
                }}
                checked={checkedInputs.includes(brands[v].brandSeq) ? true : false}
              />
              <label htmlFor={brands[v].brandSeq}>{brands[v].brandName} </label>
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
