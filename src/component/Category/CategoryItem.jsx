"use client";
import React, { useMemo } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import classNames from "classnames";

const CategoryItem = ({ index, category, onSelect, isActive }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { categoryImageUrl, categoryName, categoryNo } = category || {};

  const href = useMemo(() => {
    const params = new URLSearchParams(searchParams.toString());
    const raw = params.get("f");
    const tokens = raw ? raw.split(",").filter(Boolean) : [];
    const otherTokens = tokens.filter((token) => !token.startsWith("c:"));
    const nextTokens = [`c:${categoryNo}`, ...otherTokens];
    params.set("f", nextTokens.join(","));
    const queryString = params.toString();
    return queryString ? `${pathname}?${queryString}` : pathname;
  }, [categoryNo, pathname, searchParams]);

  return (
    <li className={classNames("list-item", isActive && "list-item--active")}>
      <Link className='link__category' href={href} onClick={onSelect}>
        <span className='box__category-img'>
          <img src={categoryImageUrl} alt='' className='image' />
        </span>
        <span className='text__category'>{categoryName}</span>
      </Link>
    </li>
  );
};

export default CategoryItem;
