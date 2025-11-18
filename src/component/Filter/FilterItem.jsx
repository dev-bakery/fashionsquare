import React, { useMemo, useCallback } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { filterLayerAtom } from "../atom/atom";
import { useAtom } from "jotai";
import Checkbox from "../Parts/Checkbox";

const QUICK_FILTERS = [
  { id: "checkbox-simple-t:n-", name: "t:n", label: "신상품" },
  { id: "checkbox-simple-d:f-", name: "d:f", label: "무료배송" },
];

const FilterItem = () => {
  const [, setFilterLayer] = useAtom(filterLayerAtom);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const tokens = useMemo(() => {
    const value = searchParams.get("f");
    return value ? value.split(",").filter(Boolean) : [];
  }, [searchParams]);

  const selectedFilters = useMemo(() => tokens.filter((token) => !token.startsWith("c:")), [tokens]);

  const toggleFilter = useCallback(
    (name) => {
      const categoryToken = tokens.find((token) => token.startsWith("c:"));
      const currentFilters = tokens.filter((token) => !token.startsWith("c:"));

      const hasFilter = currentFilters.includes(name);
      const nextFilters = hasFilter ? currentFilters.filter((token) => token !== name) : [...currentFilters, name];

      const mergedTokens = [...(categoryToken ? [categoryToken] : []), ...nextFilters];

      const params = new URLSearchParams(searchParams.toString());
      if (mergedTokens.length) {
        params.set("f", mergedTokens.join(","));
      } else {
        params.delete("f");
      }

      const queryString = params.toString();
      router.replace(queryString ? `${pathname}?${queryString}` : pathname, {
        scroll: false,
      });
    },
    [pathname, router, searchParams, tokens]
  );

  return (
    <div className='box__filter-item'>
      <div className='box__filter-item-inner'>
        <div className='box__filter-quick'>
          {QUICK_FILTERS.map(({ id, name, label }) => (
            <div className='box__quick-item' key={name}>
              <Checkbox id={id} name={name} text={label} checked={selectedFilters.includes(name)} onChange={() => toggleFilter(name)} />
            </div>
          ))}
          <button type='button' className='button__filter' aria-haspopup='dialog' aria-label='필터 레이어 열기' onClick={() => setFilterLayer((prev) => !prev)}>
            필터
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterItem;
