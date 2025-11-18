import classNames from "classnames";
import { useAtom } from "jotai";
import React from "react";
import { filterLayerAtom } from "../atom/atom";
import FilterTitle from "./FilterTitle";
import Checkbox from "../Parts/Checkbox";

const FilterLayer = () => {
  const [filterLayer, setFilterLayer] = useAtom(filterLayerAtom);
  return (
    <div
      className={classNames(
        "box__filter-container",
        filterLayer && "box__filter-container--active"
      )}
    >
      <div className='box__layer-content'>
        <FilterTitle />
        <div className='box__layer-scoll'>
          <div className='box__component box__component-check-linear-filter box__component--active'>
            <div className='box__filter-content'>
              <div className='box__category-group'>
                <ul className='list__category'>
                  <li className='list-item'>
                    <div className='box__link-category'>
                      <Checkbox
                        id={"checkbox-simple-t:n-0"}
                        name={"t:n"}
                        text={"신상품"}
                      />
                    </div>
                  </li>
                  <li className='list-item'>
                    <div className='box__link-category'>
                      <Checkbox
                        id={"checkbox-simple-d:f-0"}
                        name={"d:f"}
                        text={"무료배송"}
                      />
                    </div>
                  </li>
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
