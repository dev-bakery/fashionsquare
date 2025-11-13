"use client";
import CategoryLayer from "@/component/Category/CategoryLayer";
import CategoryTab from "@/component/Category/CategoryTab";
import CategoryList from "@/component/Category/CategoryList";
import dummyData from "@/component/dummyData/dummyData.json";
import TabNavigation from "@/component/TabNavigation/TabNavigation";
import FilterItem from "@/component/Filter/FilterItem";
import SortItem from "@/component/SortItem/SortItem";
import FilterLayer from "@/component/Filter/FilterLayer";

const Category = () => {
  return (
    <>
      <div className='box__brand-index box__brand-index--result'>
        <div className='box__brand-index--inner'>
          <TabNavigation />
        </div>
      </div>
      <CategoryTab data={dummyData.categories} />
      <CategoryLayer data={dummyData.categories} />
      <FilterItem />
      <FilterLayer />
      <SortItem />
      <CategoryList />
    </>
  );
};
export default Category;
