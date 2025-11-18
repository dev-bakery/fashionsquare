import React from "react";
import { filterLayerAtom } from "../atom/atom";
import { useAtom } from "jotai";
import Checkbox from "../Parts/Checkbox";
import { QUICK_FILTERS } from "./constants";
import useFilterParams from "./useFilterParams";
import classNames from "classnames";

const FilterItem = () => {
  const [, setFilterLayer] = useAtom(filterLayerAtom);
  const { selectedFilters, toggleFilter } = useFilterParams();

  return (
    <div className='box__filter-item'>
      <div className='box__filter-item-inner'>
        <div className='box__filter-quick'>
          {QUICK_FILTERS.map(({ name, label }) => (
            <div className='box__quick-item' key={name}>
              <Checkbox id={`checkbox-simple-${name}-tab`} name={name} text={label} checked={selectedFilters.includes(name)} onChange={() => toggleFilter(name)} />
            </div>
          ))}
          <button type='button' className={classNames("button__filter", selectedFilters.length > 0 && "button__filter--active")} aria-haspopup='dialog' aria-label='필터 레이어 열기' onClick={() => setFilterLayer((prev) => !prev)}>
            필터
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterItem;
