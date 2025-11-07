"use client";
import React, { useEffect, useState } from "react";

const CategoryList = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://690d9707a6d92d83e85226b2.mockapi.io/api/items")
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      });
  }, []);
  if (loading) return <p>불러오는 중...</p>;
  return (
    <div className='box__itemcard-wrap'>
      {items.map((item) => (
        <li></li>
      ))}
    </div>
  );
};

export default CategoryList;
