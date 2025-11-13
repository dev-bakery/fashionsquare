import classNames from "classnames";
import React from "react";
import CategoryItem from "./CategoryItem";
import { categoryLayerAtom } from "../atom/atom";
import { useAtom } from "jotai";

const CategoryTab = ({ data }) => {
  const [categoryLayer, setCategoryLayer] = useAtom(categoryLayerAtom);

  return (
    <div className={classNames("box__sub-category")}>
      <div className='box__sub-category-inner'>
        <div className='box__1depth-content'>
          <div className='box__1depth-content-inner'>
            <button
              type='button'
              className={classNames(
                "button__category",
                categoryLayer && "button__category--active"
              )}
              aria-haspopup='dialog'
              aria-label='카테고리 레이어 열기'
              onClick={() => setCategoryLayer((prev) => !prev)}
            >
              카테고리
            </button>
            <div className='box__scroll-content'>
              <ul className='list__category'>
                {data?.map((category, index) => (
                  <CategoryItem
                    key={category.categoryNo}
                    index={index}
                    category={category}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className='box__2depth-content'>
          <ul className='list__category'>
            {data.map((item, i) => {
              const { subCategories } = item;
              return (
                <>
                  {subCategories.map((v, j) => (
                    <li key={j} className='list-item'>
                      <a className='link__category' href=''>
                        {v.categoryName}
                      </a>
                    </li>
                  ))}
                </>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CategoryTab;
