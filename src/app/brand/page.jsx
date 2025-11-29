"use client";
import React, { useState, useEffect } from "react";
import BrandSubTab from "@/component/BrandSubTab/BrandSubTab";
import BrandTabPanel from "@/component/BrandTabPanel/BrandTabPanel";
import TabNavigation from "@/component/TabNavigation/TabNavigation";
import BrandInfo from "@/component/BrandInfo/BrandInfo";
import BrandFooter from "@/component/BrandFooter/BrandFooter";
import BrandFilter from "@/component/BrandFilter/BrandFilter";
import FilterItem from "@/component/Filter/FilterItem";
import classNames from "classnames";
import SortItem from "@/component/SortItem/SortItem";
import ItemContainer from "@/component/ItemContainer/ItemContainer";
import Footer from "@/component/Footer/Footer";

const Brand = () => {
  const [brandData, setBrandData] = useState(null);
  const [allItems, setAllItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isActive, setIsActive] = useState(0);
  const [isKeywordActive, setIsKeywordActive] = useState(0);
  const [isKeyword, setIsKeyword] = useState("");
  const [checkedInputs, setCheckedInputs] = useState([]);
  const [isSelected, setIsSelected] = useState([]);
  const [brandSetting, setBrandSetting] = useState(false);
  const [isFilteredItems, setIsFilteredItems] = useState([]);
  const [isAreacode, setIsAreacode] = useState("200005781");

  useEffect(() => {
    const fetchBrandData = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://690d9707a6d92d83e85226b2.mockapi.io/api/brand");
        const data = await response.json();
        // API 응답이 배열인 경우 첫 번째 요소 사용, 아니면 직접 사용
        const brandDataObj = Array.isArray(data) ? data[0] : data;
        // brandData 형태로 변환
        const formattedData = {
          currentTabId: brandDataObj.currentTabId,
          tabs: brandDataObj.tabs || [],
          brands: brandDataObj.brands || {},
          indexes: brandDataObj.indexes || {},
        };
        setBrandData(formattedData);
        setIsSelected(formattedData.tabs);
      } catch (error) {
        console.error("Failed to fetch brand data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBrandData();
  }, []);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch("http://localhost:1337/api/fashion-triangles?populate=*");
        const payload = await response.json();
        const normalizedItems = Array.isArray(payload)
          ? payload
          : Array.isArray(payload?.data)
          ? payload.data.map((item) => {
              const attributes = item?.attributes ? { id: item.id, ...item.attributes } : item;
              return attributes;
            })
          : [];
        setAllItems(normalizedItems);
      } catch (error) {
        console.error("Failed to fetch items:", error);
      }
    };

    fetchItems();
  }, []);

  // checkedInputs가 변경될 때마다 선택된 브랜드에 해당하는 아이템 필터링
  useEffect(() => {
    if (!brandData || !allItems.length || !checkedInputs.length) {
      setIsFilteredItems([]);
      return;
    }

    // 선택된 모든 브랜드 정보 수집
    const selectedBrands = checkedInputs.map((id) => brandData.brands[id] || brandData.brands[String(id)]).filter(Boolean);

    if (selectedBrands.length === 0) {
      console.log("No brands found for checkedInputs:", checkedInputs);
      setIsFilteredItems([]);
      return;
    }

    // 모든 브랜드명을 Set으로 수집 (중복 제거, 정규화)
    const brandNames = new Set();
    const normalizeName = (name) => name?.trim().toLowerCase();

    selectedBrands.forEach((brand) => {
      if (brand.brandName) brandNames.add(normalizeName(brand.brandName));
      if (brand.brandNameKr) brandNames.add(normalizeName(brand.brandNameKr));
      if (brand.brandNameEn) brandNames.add(normalizeName(brand.brandNameEn));
    });

    console.log("Selected brands:", selectedBrands);
    console.log("Brand names to match (normalized):", Array.from(brandNames));
    console.log("Total items:", allItems.length);
    console.log(
      "Sample item brand names:",
      allItems.slice(0, 5).map((item) => item?.sdBrandName)
    );

    // allItems에서 선택된 브랜드에 해당하는 아이템 필터링 (중복 제거)
    const filteredItems = allItems.filter((item) => {
      const itemBrandName = item?.sdBrandName;
      if (!itemBrandName) return false;

      const normalizedItemBrandName = normalizeName(itemBrandName);
      const matches = brandNames.has(normalizedItemBrandName);

      if (matches) {
        console.log("Matched item:", itemBrandName, "->", normalizedItemBrandName, item?.itemName);
      }
      return matches;
    });

    console.log("Filtered items count:", filteredItems.length);

    // itemNo 또는 id 기준으로 중복 제거
    const uniqueItems = filteredItems.filter((item, index, self) => {
      const identifier = item?.itemNo || item?.id;
      return identifier && index === self.findIndex((i) => (i?.itemNo || i?.id) === identifier);
    });

    console.log("Unique items count:", uniqueItems.length);
    setIsFilteredItems(uniqueItems);
  }, [checkedInputs, allItems, brandData]);

  const handleChange = (checked, id) => {
    if (!brandData) {
      console.warn("brandData is not available");
      return;
    }

    // brandSeq로 브랜드 정보 찾기 (숫자/문자열 모두 시도)
    const brand = brandData.brands[id] || brandData.brands[String(id)];
    if (!brand) {
      console.warn(`Brand not found for id: ${id}`, {
        id,
        idType: typeof id,
        availableKeys: Object.keys(brandData.brands).slice(0, 10),
        brandsSample: Object.values(brandData.brands).slice(0, 3),
      });
      return;
    }

    console.log("handleChange:", { checked, id, brand });

    if (checked) {
      setCheckedInputs([...checkedInputs, id]);
    } else {
      setCheckedInputs(checkedInputs.filter((el) => el !== id));
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

  if (loading || !brandData) return <p>불러오는 중...</p>;

  return (
    <>
      <div className={classNames("box__brand-index", brandSetting && "box__brand-index--result")}>
        <div className='box__brand-index--inner'>
          <TabNavigation />
          {!brandSetting && (
            <div className='box__brand-section'>
              <BrandSubTab data={brandData.tabs} isSelected={isSelected} setIsSelected={setIsSelected} setIsActive={setIsActive} setIsKeywordActive={setIsKeywordActive} />
              <BrandTabPanel data={brandData.tabs[isActive]} isKeywordActive={isKeywordActive} setIsKeyword={setIsKeyword} setIsKeywordActive={setIsKeywordActive} />
              <BrandInfo data={brandData} isKeyword={isKeyword} checkedInputs={checkedInputs} handleChange={handleChange} currentTab={brandData.tabs[isActive]} />
              <BrandFooter checkedInputs={checkedInputs} setCheckedInputs={setCheckedInputs} data={brandData} brandSetting={brandSetting} setBrandSetting={setBrandSetting} setIsFilteredItems={setIsFilteredItems} isFilteredItems={isFilteredItems} setIsAreacode={setIsAreacode} />
            </div>
          )}
        </div>
      </div>
      {brandSetting && (
        <>
          <BrandFilter checkedInputs={checkedInputs} setCheckedInputs={setCheckedInputs} setBrandSetting={setBrandSetting} data={brandData} setIsFilteredItems={setIsFilteredItems} isFilteredItems={isFilteredItems} setIsAreacode={setIsAreacode} currentTab={brandData.tabs[isActive]} />
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
