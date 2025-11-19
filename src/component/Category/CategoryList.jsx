"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import ItemCard from "../ItemCard/ItemCard";

const CategoryList = ({ onCountChange }) => {
  const searchParams = useSearchParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const tokens = useMemo(() => {
    const fParam = searchParams.get("f");
    return fParam ? fParam.split(",").filter(Boolean) : [];
  }, [searchParams]);

  const categoryToken = tokens.find((token) => token.startsWith("c:"));
  const categoryCode = categoryToken?.split(":")[1] || "100000000";

  const filterTokens = useMemo(() => tokens.filter((token) => !token.startsWith("c:")), [tokens]);

  useEffect(() => {
    if (!categoryCode) return;

    const apiUrl = `https://690d9707a6d92d83e85226b2.mockapi.io/api/${categoryCode}`;

    setLoading(true);
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [categoryCode]);

  const sortParam = searchParams.get("s") || "1";

  const filteredItems = useMemo(() => {
    if (!filterTokens.length) return items;

    return items.filter((item) =>
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
  }, [items, filterTokens]);

  const sortedItems = useMemo(() => {
    const list = [...filteredItems];
    switch (sortParam) {
      case "1":
        return list.sort((a, b) => (b?.buyCount || 0) - (a?.buyCount || 0));
      case "2":
        return list.sort((a, b) => (a?.itemPrice || 0) - (b?.itemPrice || 0));
      case "3":
        return list.sort((a, b) => (b?.itemPrice || 0) - (a?.itemPrice || 0));
      default:
        return list;
    }
  }, [filteredItems, sortParam]);

  useEffect(() => {
    if (!loading) {
      onCountChange?.(sortedItems.length);
    }
  }, [sortedItems, loading, onCountChange]);

  if (loading) return <p>불러오는 중...</p>;

  return (
    <div className='box__itemcard-wrap'>
      {sortedItems.map((item, index) => (
        <ItemCard key={index} item={item} />
      ))}
    </div>
  );
};

export default CategoryList;
