"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import ItemCard from "../ItemCard/ItemCard";

const CategoryList = () => {
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

  if (loading) return <p>불러오는 중...</p>;

  return (
    <div className='box__itemcard-wrap'>
      {filteredItems.map((item, index) => (
        <ItemCard key={index} item={item} />
      ))}
    </div>
  );
};

export default CategoryList;
