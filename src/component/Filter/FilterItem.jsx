import React from "react";
import { filterLayerAtom } from "../atom/atom";
import { useAtom } from "jotai";
import Checkbox from "../Parts/Checkbox";

const FilterItem = () => {
  const [filterLayer, setFilterLayer] = useAtom(filterLayerAtom);

  return (
    <div className='box__filter-item'>
      <div className='box__filter-item-inner'>
        <div className='box__filter-quick'>
          <div className='box__quick-item'>
            <Checkbox
              id={"checkbox-simple-t:n-"}
              name={"t:n"}
              text={"신상품"}
            />
          </div>
          <div className='box__quick-item'>
            <Checkbox
              id={"checkbox-simple-d:f-"}
              name={"d:f"}
              text={"무료배송"}
            />
          </div>
          <button
            type='button'
            className='button__filter'
            aria-haspopup='dialog'
            aria-label='필터 레이어 열기'
            onClick={() => setFilterLayer((prev) => !prev)}
          >
            필터
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterItem;
