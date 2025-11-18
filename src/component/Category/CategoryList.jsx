"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ItemCard from "../ItemCard/ItemCard";

const CategoryList = () => {
  const searchParams = useSearchParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // URL에서 f=c:100000000 추출
  const fParam = searchParams.get("f"); // c:100000000
  const categoryCode = fParam?.split(":")[1] || "100000000";

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

  if (loading) return <p>불러오는 중...</p>;

  return (
    <div className='box__itemcard-wrap'>
      {items.map((item, index) => (
        <ItemCard key={index} item={item} />
      ))}
    </div>
  );
};

export default CategoryList;
