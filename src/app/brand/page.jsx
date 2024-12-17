"use client";
import React, { useState, useEffect } from "react";
import BrandSubTab from "@/component/BrandSubTab/BrandSubTab";
import BrandTabPanel from "@/component/BrandTabPanel/BrandTabPanel";
import TabNavigation from "@/component/TabNavigation/TabNavigation";
import BrandInfo from "@/component/BrandInfo/BrandInfo";
import BrandFooter from "@/component/BrandFooter/BrandFooter";
import dummyData from "@/component/dummyData/dummyData.json";
import dummyBrandItemData from "@/component/dummyData/brandItemData.json";
import BrandFilter from "@/component/BrandFilter/BrandFilter";
import FilterItem from "@/component/FilterItem/FilterItem";
import classNames from "classnames";
import SortItem from "@/component/SortItem/SortItem";
import ItemContainer from "@/component/ItemContainer/ItemContainer";
import Footer from "@/component/Footer/Footer";

const Brand = () => {
  const [isActive, setIsActive] = useState(0);
  const [isKeywordActive, setIsKeywordActive] = useState(0);
  const [isKeyword, setIsKeyword] = useState("");
  const [checkedInputs, setCheckedInputs] = useState([]);
  const [isSelected, setIsSelected] = useState(dummyData.brandData.tabs);
  const [brandSetting, setBrandSetting] = useState(false);
  const [isFilteredItems, setIsFilteredItems] = useState([]);
  const [isAreacode, setIsAreacode] = useState("200005781");

  const handleChange = (checked, id) => {
    if (checked) {
      setCheckedInputs([...checkedInputs, id]);
      setIsFilteredItems([...isFilteredItems, ...dummyBrandItemData.filter((item) => item.brandNo === id)]);

      // console.log(isFilteredItems);
    } else {
      setCheckedInputs(checkedInputs.filter((el) => el !== id));
      setIsFilteredItems(isFilteredItems.filter((el) => el.brandNo !== id));
    }
  };
  const handlePriceLow = (e, areacode) => {
    e.preventDefault();
    setIsAreacode(areacode);
    setIsFilteredItems(isFilteredItems.sort((a, b) => a.sellPrice - b.sellPrice));
  };

  const handlePriceHigh = (e, areacode) => {
    e.preventDefault();
    setIsAreacode(areacode);
    setIsFilteredItems(isFilteredItems.sort((a, b) => b.sellPrice - a.sellPrice));
  };

  const handleBuycount = (e, areacode) => {
    e.preventDefault();
    setIsAreacode(areacode);
    setIsFilteredItems(isFilteredItems.sort((a, b) => b.buyCount - a.buyCount));
  };

  const handleBrandReset = () => {
    setCheckedInputs([]);
    setBrandSetting(false);
    setIsFilteredItems([]);
    setIsAreacode("200005781");
    setIsKeywordActive(0);
  };

  return (
    <>
      <div className={classNames("box__brand-index", brandSetting && "box__brand-index--result")}>
        <div className='box__brand-index--inner'>
          <TabNavigation />
          {!brandSetting && (
            <div className='box__brand-section'>
              <BrandSubTab data={dummyData.brandData.tabs} isSelected={isSelected} setIsSelected={setIsSelected} setIsActive={setIsActive} setIsKeywordActive={setIsKeywordActive} />
              <BrandTabPanel data={dummyData.brandData.tabs[isActive]} isKeywordActive={isKeywordActive} setIsKeyword={setIsKeyword} setIsKeywordActive={setIsKeywordActive} />
              <BrandInfo data={dummyData.brandData} isKeyword={isKeyword} checkedInputs={checkedInputs} handleChange={handleChange} />
              <BrandFooter checkedInputs={checkedInputs} setCheckedInputs={setCheckedInputs} data={dummyData.brandData} brandSetting={brandSetting} setBrandSetting={setBrandSetting} setIsFilteredItems={setIsFilteredItems} isFilteredItems={isFilteredItems} setIsAreacode={setIsAreacode} />
            </div>
          )}
        </div>
      </div>
      {brandSetting && (
        <>
          <BrandFilter checkedInputs={checkedInputs} setCheckedInputs={setCheckedInputs} setBrandSetting={setBrandSetting} data={dummyData.brandData} setIsFilteredItems={setIsFilteredItems} isFilteredItems={isFilteredItems} setIsAreacode={setIsAreacode} />
          <FilterItem />
          {isFilteredItems.length !== 0 ? (
            <>
              <SortItem isAreacode={isAreacode} handlePriceLow={handlePriceLow} handlePriceHigh={handlePriceHigh} handleBuycount={handleBuycount} count={isFilteredItems.length} />
              <ItemContainer isFilteredItems={isFilteredItems} setIsFilteredItems={setIsFilteredItems} checkedInputs={checkedInputs} />
            </>
          ) : (
            <div className='box__error-search'>
              <span className='box__animation'>
                <embed src='//pics.gmarket.co.kr/mobile/single/kr/common/neutral_face.svg' type='image/svg+xml' />
              </span>
              <span className='text__normal'>
                <em className='text__highlight'>선택한 필터</em>에 대한 검색결과가 없습니다.
                <br />
              </span>
              <span className='text__small'>필터를 다시 확인해 주세요.</span>
              <button type='button' className='button__re-search' onClick={handleBrandReset}>
                모든 필터 초기화
              </button>
            </div>
          )}
          <Footer />
        </>
      )}
    </>
  );
};
export default Brand;
