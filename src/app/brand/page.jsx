"use client";
import React, { useState, useEffect, useMemo } from "react";
import BrandSubTab from "@/component/BrandSubTab/BrandSubTab";
import BrandTabPanel from "@/component/BrandTabPanel/BrandTabPanel";
import TabNavigation from "@/component/TabNavigation/TabNavigation";
import BrandInfo from "@/component/BrandInfo/BrandInfo";
import BrandFooter from "@/component/BrandFooter/BrandFooter";
import BrandFilter from "@/component/BrandFilter/BrandFilter";
import FilterItem from "@/component/Filter/FilterItem";
import FilterLayer from "@/component/Filter/FilterLayer";
import classNames from "classnames";
import SortItem from "@/component/SortItem/SortItem";
import ItemContainer from "@/component/ItemContainer/ItemContainer";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { fetchBrandData, fetchFashionTriangles } from "@/lib/api";

export const dynamic = "force-dynamic";

const Brand = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
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
  const [selectedBrandTabs, setSelectedBrandTabs] = useState({}); // { brandId: tab }

  // 정렬 파라미터에서 areacode 계산
  const sortParam = searchParams.get("s") || "1";
  const isAreacode = useMemo(() => {
    switch (sortParam) {
      case "2":
        return "200005782";
      case "3":
        return "200005783";
      default:
        return "200005781";
    }
  }, [sortParam]);

  useEffect(() => {
    const loadBrandData = async () => {
      try {
        setLoading(true);
        const formattedData = await fetchBrandData();
        setBrandData(formattedData);
        setIsSelected(formattedData.tabs);
      } catch (error) {
        console.error("Failed to fetch brand data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadBrandData();
  }, []);

  // URL 파라미터에서 브랜드 정보 읽기
  useEffect(() => {
    if (!brandData) return;

    const fParam = searchParams.get("f");
    if (!fParam) return;

    const tokens = fParam.split(",").filter(Boolean);
    const brandTokens = tokens.filter((token) => token.startsWith("b:"));
    const brandIds = brandTokens.map((token) => token.split(":")[1]).filter(Boolean);

    if (brandIds.length > 0) {
      // URL의 브랜드 ID가 실제 브랜드 데이터에 존재하는지 확인
      const validBrandIds = brandIds.filter((id) => {
        const brand = brandData.brands[id] || brandData.brands[String(id)];
        return !!brand;
      });
      if (validBrandIds.length > 0) {
        setCheckedInputs(validBrandIds);
        setBrandSetting(true);
        // URL에서 읽어올 때는 기존 selectedBrandTabs를 유지하고, 없는 브랜드만 현재 활성 탭 사용
        setSelectedBrandTabs((prev) => {
          const updated = { ...prev };
          validBrandIds.forEach((id) => {
            // 이미 저장된 탭 정보가 없을 때만 현재 활성 탭 사용
            if (!updated[id] && !updated[String(id)] && brandData.tabs && brandData.tabs[isActive]) {
              updated[id] = brandData.tabs[isActive];
            }
          });
          return updated;
        });
      }
    }
  }, [brandData, searchParams, isActive]);

  useEffect(() => {
    const loadItems = async () => {
      try {
        const normalizedItems = await fetchFashionTriangles({ populate: true });
        setAllItems(normalizedItems);
      } catch (error) {
        console.error("Failed to fetch items:", error);
      }
    };

    loadItems();
  }, []);

  // URL에서 필터 토큰 추출 (브랜드 제외)
  const filterTokens = useMemo(() => {
    const fParam = searchParams.get("f");
    if (!fParam) return [];
    const tokens = fParam.split(",").filter(Boolean);
    // 브랜드(b:)와 카테고리(c:)를 제외한 필터만 추출
    return tokens.filter((token) => !token.startsWith("b:") && !token.startsWith("c:"));
  }, [searchParams]);

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

    // allItems에서 선택된 브랜드에 해당하는 아이템 필터링 (중복 제거)
    let filteredItems = allItems.filter((item) => {
      const itemBrandName = item?.sdBrandName;
      if (!itemBrandName) return false;

      const normalizedItemBrandName = normalizeName(itemBrandName);
      const matches = brandNames.has(normalizedItemBrandName);

      if (matches) {
        console.log("Matched item:", itemBrandName, "->", normalizedItemBrandName, item?.itemName);
      }
      return matches;
    });

    // 추가 필터 적용 (신상품, 무료배송 등)
    if (filterTokens.length > 0) {
      filteredItems = filteredItems.filter((item) =>
        filterTokens.every((token) => {
          if (token === "t:n") {
            return Boolean(item?.isNew);
          }
          if (token === "d:f") {
            return item?.deliveryText === "무료배송";
          }
          return true;
        })
      );
    }

    console.log("Filtered items count:", filteredItems.length);

    // itemNo 또는 id 기준으로 중복 제거
    const uniqueItems = filteredItems.filter((item, index, self) => {
      const identifier = item?.itemNo || item?.id;
      return identifier && index === self.findIndex((i) => (i?.itemNo || i?.id) === identifier);
    });

    console.log("Unique items count:", uniqueItems.length);

    // 정렬 적용
    const sortParam = searchParams.get("s") || "1";
    const sortedItems = [...uniqueItems];
    switch (sortParam) {
      case "1":
        sortedItems.sort((a, b) => (b?.buyCount || 0) - (a?.buyCount || 0));
        break;
      case "2":
        sortedItems.sort((a, b) => (a?.itemPrice || 0) - (b?.itemPrice || 0));
        break;
      case "3":
        sortedItems.sort((a, b) => (b?.itemPrice || 0) - (a?.itemPrice || 0));
        break;
      default:
        break;
    }

    setIsFilteredItems(sortedItems);
  }, [checkedInputs, allItems, brandData, filterTokens, searchParams]);

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

    // 브랜드를 선택할 때 현재 탭 정보 저장
    if (checked && brandData.tabs && brandData.tabs[isActive]) {
      setSelectedBrandTabs((prev) => ({
        ...prev,
        [id]: brandData.tabs[isActive],
      }));
    } else if (!checked) {
      // 브랜드 선택 해제 시 탭 정보도 제거
      setSelectedBrandTabs((prev) => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
    }

    if (checked) {
      setCheckedInputs([...checkedInputs, id]);
    } else {
      setCheckedInputs(checkedInputs.filter((el) => el !== id));
    }
  };
  const updateSortParam = (value) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("s", value);
    const queryString = params.toString();
    router.replace(queryString ? `${pathname}?${queryString}` : pathname, { scroll: false });
  };

  const handlePriceLow = (e, areacode) => {
    e.preventDefault();
    updateSortParam("2");
  };

  const handlePriceHigh = (e, areacode) => {
    e.preventDefault();
    updateSortParam("3");
  };

  const handleBuycount = (e, areacode) => {
    e.preventDefault();
    updateSortParam("1");
  };

  const handleBrandReset = () => {
    setCheckedInputs([]);
    setBrandSetting(false);
    setIsFilteredItems([]);
    setIsKeywordActive(0);
    setSelectedBrandTabs({});

    // URL에서 브랜드 파라미터 제거
    const params = new URLSearchParams(searchParams.toString());
    const fParam = params.get("f");
    if (fParam) {
      const tokens = fParam.split(",").filter(Boolean);
      const nonBrandTokens = tokens.filter((token) => !token.startsWith("b:"));
      if (nonBrandTokens.length > 0) {
        params.set("f", nonBrandTokens.join(","));
      } else {
        params.delete("f");
      }
      const queryString = params.toString();
      router.replace(queryString ? `${pathname}?${queryString}` : pathname, { scroll: false });
    }
  };

  const updateBrandParams = (brandIds) => {
    const params = new URLSearchParams(searchParams.toString());
    const fParam = params.get("f");

    // 기존 f 파라미터에서 브랜드가 아닌 것들만 유지
    let otherTokens = [];
    if (fParam) {
      const tokens = fParam.split(",").filter(Boolean);
      otherTokens = tokens.filter((token) => !token.startsWith("b:"));
    }

    // 브랜드 토큰 추가
    const brandTokens = brandIds.map((id) => `b:${id}`);
    const allTokens = [...otherTokens, ...brandTokens];

    if (allTokens.length > 0) {
      params.set("f", allTokens.join(","));
    } else {
      params.delete("f");
    }

    const queryString = params.toString();
    router.replace(queryString ? `${pathname}?${queryString}` : pathname, { scroll: false });
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
              <BrandFooter checkedInputs={checkedInputs} setCheckedInputs={setCheckedInputs} data={brandData} brandSetting={brandSetting} setBrandSetting={setBrandSetting} setIsFilteredItems={setIsFilteredItems} isFilteredItems={isFilteredItems} updateBrandParams={updateBrandParams} selectedBrandTabs={selectedBrandTabs} />
            </div>
          )}
        </div>
      </div>
      {brandSetting && (
        <>
          <BrandFilter checkedInputs={checkedInputs} setCheckedInputs={setCheckedInputs} setBrandSetting={setBrandSetting} data={brandData} setIsFilteredItems={setIsFilteredItems} isFilteredItems={isFilteredItems} selectedBrandTabs={selectedBrandTabs} updateBrandParams={updateBrandParams} setSelectedBrandTabs={setSelectedBrandTabs} />
          <FilterItem />
          <FilterLayer />
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
        </>
      )}
    </>
  );
};
export default Brand;
