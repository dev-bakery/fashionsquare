import classNames from "classnames";
import { useAtom } from "jotai";
import React from "react";
import { filterLayerAtom } from "../atom/atom";
import FilterTitle from "./FilterTitle";

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
                      <input
                        type='checkbox'
                        name='t:n'
                        id='checkbox-t:n-0'
                        className='form__input-checkbox'
                        value=''
                      />
                      <label for='checkbox-t:n-0' className='form__label'>
                        <span className='text__label'>신상품</span>
                      </label>
                    </div>
                  </li>
                  <li className='list-item'>
                    <div className='box__link-category'>
                      <input
                        type='checkbox'
                        name='d:f'
                        id='checkbox-d:f-1'
                        className='form__input-checkbox'
                        value=''
                      />
                      <label for='checkbox-d:f-1' className='form__label'>
                        <span className='text__label'>무료배송</span>
                      </label>
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
