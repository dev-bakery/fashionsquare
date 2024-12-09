import classNames from "classnames";
import React, { useState, useEffect } from "react";

const BrandTabPanel = ({ data, setIsKeyword, isKeywordActive, setIsKeywordActive }) => {
  const handleClick = (v, i) => {
    setIsKeyword(v);
    setIsKeywordActive(i);
  };
  // console.log(data);
  useEffect(() => {
    setIsKeyword([...data.items][isKeywordActive]);
  });
  return (
    <div className='box__brand-tabpanel'>
      <ul className='list__category'>
        {[...data.items].map((v, i) => {
          return (
            <li className='list-item' key={i}>
              <a href='#' onClick={() => handleClick(v, i)} className={classNames("link__category", isKeywordActive === i && "selected")}>
                {v}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default BrandTabPanel;
