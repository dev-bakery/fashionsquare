import React from "react";

const CategoryItem = ({ index, category }) => {
  return (
    <li className='list-item'>
      <a className='link__category' href=''>
        <span className='box__category-img'>
          <img src={category.categoryImageUrl} alt='' className='image' />
        </span>
        <span className='text__category'>{category.categoryName}</span>
      </a>
    </li>
  );
};

export default CategoryItem;
