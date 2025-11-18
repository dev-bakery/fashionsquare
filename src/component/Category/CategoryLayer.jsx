import classNames from "classnames";
import React from "react";
import CategoryItem from "./CategoryItem";
import { useAtom } from "jotai";
import { categoryLayerAtom } from "../atom/atom";

const CategoryLayer = ({ data }) => {
  const [categoryLayer, setCategoryLayer] = useAtom(categoryLayerAtom);
  return (
    <div className={classNames("box__layer-category", categoryLayer && "box__layer-category--active")} role='dialog' aria-modal='true'>
      <div className='box__layer-content'>
        <div className='box__layer-title'>
          <p className='text__title'>패션스퀘어 카테고리</p>
          <button type='button' className='button__close' onClick={() => setCategoryLayer((prev) => !prev)}>
            <span className='for-a11y'>레이어 닫기</span>
          </button>
        </div>
        <ul className='list__category'>
          {data?.map((category, index) => (
            <CategoryItem key={category.categoryNo} index={index} category={category} onSelect={() => setCategoryLayer(false)} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CategoryLayer;
