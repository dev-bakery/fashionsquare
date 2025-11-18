"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const CategoryItem = ({ index, category }) => {
  const pathname = usePathname();
  const { categoryImageUrl, categoryName, categoryNo } = category || {};
  return (
    <li className='list-item'>
      <Link className='link__category' href={`${pathname}?f=c:${categoryNo}`}>
        <span className='box__category-img'>
          <img src={categoryImageUrl} alt='' className='image' />
        </span>
        <span className='text__category'>{categoryName}</span>
      </Link>
    </li>
  );
};

export default CategoryItem;
