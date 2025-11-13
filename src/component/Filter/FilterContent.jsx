import React from "react";

const FilterContent = () => {
  return (
    <FilterListCheckBoxLinear
      conditions={[
        { name: "t:n", label: "신상품" },
        {
          name: "d:f",
          label: "무료배송",
        },
      ]}
      hasCollapseButton={false}
    />
  );
};

export default FilterContent;
