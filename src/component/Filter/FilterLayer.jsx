import classNames from "classnames";
import { useAtom } from "jotai";
import React from "react";
import { filterLayerAtom } from "../atom/atom";
import FilterTitle from "./FilterTitle";
import Checkbox from "../Parts/Checkbox";
import { QUICK_FILTERS } from "./constants";
import useFilterParams from "./useFilterParams";

const FilterLayer = () => {
  const [filterLayer, setFilterLayer] = useAtom(filterLayerAtom);
  const { selectedFilters, toggleFilter, clearFilters } = useFilterParams();

  return (
    <div className={classNames("box__filter-container", filterLayer && "box__filter-container--active")}>
      <div className='box__layer-content'>
        <FilterTitle selectedFilters={selectedFilters} onReset={clearFilters} />
        <div className='box__layer-scoll'>
          <div className='box__component box__component-check-linear-filter box__component--active'>
            <div className='box__filter-content'>
              <div className='box__category-group'>
                <ul className='list__category'>
                  {QUICK_FILTERS.map(({ name, label }) => (
                    <li className='list-item' key={name}>
                      <div className='box__link-category'>
                        <Checkbox id={`checkbox-simple-${name}-layer`} name={name} text={label} checked={selectedFilters.includes(name)} onChange={() => toggleFilter(name)} />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='box__dimmed' aria-hidden='true' />
    </div>
  );
};

export default FilterLayer;
