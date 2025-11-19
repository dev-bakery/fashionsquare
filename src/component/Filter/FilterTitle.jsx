import { useSetAtom } from "jotai";
import React from "react";
import { filterLayerAtom } from "../atom/atom";

const FilterTitle = ({ selectedFilters, onReset }) => {
  const setFilterLayer = useSetAtom(filterLayerAtom);
  const handleReset = () => {
    onReset?.();
    setFilterLayer((prev) => !prev);
  };
  return (
    <div className='box__component box__component-filter-title'>
      <h3 className='text__title'>필터</h3>
      {selectedFilters.length > 0 && (
        <div className='box__filter-reset'>
          <button type='button' className='button__filter-reset' onClick={handleReset}>
            모두 지우기
          </button>
        </div>
      )}
      <button type='button' className='button__filter-layer-close' onClick={() => setFilterLayer((prev) => !prev)}>
        <span className='button__close-text'>필터 레이어 닫기</span>
      </button>
    </div>
  );
};

export default FilterTitle;
