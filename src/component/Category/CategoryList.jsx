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

    const apiUrl = new URL("http://localhost:1337/api/fashion-triangles?populate=*");
    apiUrl.searchParams.append("filters[lcode][$eq]", categoryCode);

    setLoading(true);
    fetch(apiUrl.toString())
      .then((res) => res.json())
      .then((payload) => {
        const normalizedItems = Array.isArray(payload)
          ? payload
          : Array.isArray(payload?.data)
          ? payload.data.map((item) => {
              const attributes = item?.attributes ? { id: item.id, ...item.attributes } : item;
              console.log(attributes);
              // Strapi 컴포넌트 구조 처리: reviewPoint
              if (attributes.reviewPoint) {
                if (attributes.reviewPoint.data) {
                  // 관계형 데이터인 경우
                  attributes.reviewPoint = Array.isArray(attributes.reviewPoint.data) ? attributes.reviewPoint.data[0]?.attributes || attributes.reviewPoint.data[0] : attributes.reviewPoint.data?.attributes || attributes.reviewPoint.data;
                }
              }

              // Strapi 컴포넌트 구조 처리: lmos
              if (attributes.lmos) {
                if (Array.isArray(attributes.lmos)) {
                  attributes.lmos = attributes.lmos.map((lmo) => {
                    if (lmo?.attributes) {
                      return lmo.attributes;
                    }
                    if (lmo?.data) {
                      return Array.isArray(lmo.data) ? lmo.data.map((d) => d?.attributes || d) : lmo.data?.attributes || lmo.data;
                    }
                    return lmo;
                  });
                } else if (attributes.lmos.data) {
                  // 단일 관계형 데이터인 경우
                  attributes.lmos = Array.isArray(attributes.lmos.data) ? attributes.lmos.data.map((d) => d?.attributes || d) : [attributes.lmos.data?.attributes || attributes.lmos.data];
                }
              }

              return attributes;
            })
          : [];
        setItems(normalizedItems);
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
