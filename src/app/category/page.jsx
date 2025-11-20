"use client";
import { useCallback, useMemo, useState, useEffect } from "react";
import CategoryLayer from "@/component/Category/CategoryLayer";
import CategoryTab from "@/component/Category/CategoryTab";
import CategoryList from "@/component/Category/CategoryList";
import TabNavigation from "@/component/TabNavigation/TabNavigation";
import FilterItem from "@/component/Filter/FilterItem";
import SortItem from "@/component/SortItem/SortItem";
import FilterLayer from "@/component/Filter/FilterLayer";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Category = () => {
  const [itemCount, setItemCount] = useState(0);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://690d9707a6d92d83e85226b2.mockapi.io/api/categories");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const sortParam = searchParams.get("s") || "1";
  const activeAreacode = useMemo(() => {
    switch (sortParam) {
      case "2":
        return "200005782";
      case "3":
        return "200005783";
      default:
        return "200005781";
    }
  }, [sortParam]);
  const handleCountChange = useCallback((nextCount) => {
    setItemCount(nextCount);
  }, []);

  const updateSortParam = useCallback(
    (value) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("s", value);
      const queryString = params.toString();
      router.replace(queryString ? `${pathname}?${queryString}` : pathname, {
        scroll: false,
      });
    },
    [pathname, router, searchParams]
  );

  const handleBuycount = useCallback(
    (event) => {
      event.preventDefault();
      updateSortParam("1");
    },
    [updateSortParam]
  );

  const handlePriceLow = useCallback(
    (event) => {
      event.preventDefault();
      updateSortParam("2");
    },
    [updateSortParam]
  );

  const handlePriceHigh = useCallback(
    (event) => {
      event.preventDefault();
      updateSortParam("3");
    },
    [updateSortParam]
  );

  return (
    <>
      <div className='box__brand-index box__brand-index--result'>
        <div className='box__brand-index--inner'>
          <TabNavigation />
        </div>
      </div>
      {!loading && (
        <>
          <CategoryTab data={categories} />
          <CategoryLayer data={categories} />
        </>
      )}
      <FilterItem />
      <FilterLayer />
      <SortItem count={itemCount} isAreacode={activeAreacode} handleBuycount={handleBuycount} handlePriceLow={handlePriceLow} handlePriceHigh={handlePriceHigh} />
      <CategoryList onCountChange={handleCountChange} />
    </>
  );
};
export default Category;
