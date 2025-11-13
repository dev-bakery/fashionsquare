import { useSetAtom } from "jotai";
import React from "react";
import { filterLayerAtom } from "../atom/atom";

const FilterTitle = () => {
  const setFilterLayer = useSetAtom(filterLayerAtom);
  return (
    <div className='box__component box__component-filter-title'>
      <h3 className='text__title'>필터</h3>
      <button
        type='button'
        className='button__filter-layer-close'
        onClick={() => setFilterLayer((prev) => !prev)}
      >
        <span className='button__close-text'>필터 레이어 닫기</span>
      </button>
    </div>
  );
};

export default FilterTitle;
