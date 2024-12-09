import classNames from "classnames";
import React from "react";

const BrandSubTab = ({ data, isSelected, setIsSelected, setIsActive, setIsKeywordActive }) => {
  const handleClick = (v, i) => {
    let copy = [...isSelected];
    copy.map((value, index) => {
      return (value.isSelected = !value.isSelected);
    });
    // console.log(copy);
    setIsActive(i);
    setIsSelected(copy);
    setIsKeywordActive(0);
  };
  return (
    <div className='box__brand-tab--sub' role='tablist'>
      {data.map((v, i) => {
        return (
          <button key={i} role='tab' onClick={() => handleClick(v, i)} aria-selected={v.isSelected} aria-controls={v.id} className={classNames(`link__tab ${v.isSelected ? "selected" : ""}`)}>
            {v.tabName}
          </button>
        );
      })}
    </div>
  );
};

export default BrandSubTab;
