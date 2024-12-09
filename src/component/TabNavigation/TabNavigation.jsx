"use client";

import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const TabNavigation = () => {
  const pathname = usePathname();
  return (
    <div className='box__brand-tab'>
      <Link href='/brand' aria-current={pathname === "/brand" && true} className={classNames(`link__tab`, pathname === "/brand" ? "selected" : "")}>
        브랜드
      </Link>
      <Link href='/category' aria-current={pathname === "/category" && true} className={classNames(`link__tab`, pathname === "/category" ? "selected" : "")}>
        카테고리
      </Link>
    </div>
  );
};

export default TabNavigation;
