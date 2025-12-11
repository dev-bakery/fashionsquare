import { useCallback, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const useFilterParams = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const tokens = useMemo(() => {
    const value = searchParams.get("f");
    return value ? value.split(",").filter(Boolean) : [];
  }, [searchParams]);

  const selectedFilters = useMemo(() => tokens.filter((token) => !token.startsWith("c:") && !token.startsWith("b:")), [tokens]);

  const toggleFilter = useCallback(
    (name) => {
      const categoryToken = tokens.find((token) => token.startsWith("c:"));
      const brandTokens = tokens.filter((token) => token.startsWith("b:"));
      const currentFilters = tokens.filter((token) => !token.startsWith("c:") && !token.startsWith("b:"));

      const hasFilter = currentFilters.includes(name);
      const nextFilters = hasFilter ? currentFilters.filter((token) => token !== name) : [...currentFilters, name];

      const mergedTokens = [...(categoryToken ? [categoryToken] : []), ...brandTokens, ...nextFilters];

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

  const clearFilters = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    const categoryToken = tokens.find((token) => token.startsWith("c:"));
    const brandTokens = tokens.filter((token) => token.startsWith("b:"));
    const preservedTokens = [...(categoryToken ? [categoryToken] : []), ...brandTokens];
    
    if (preservedTokens.length > 0) {
      params.set("f", preservedTokens.join(","));
    } else {
      params.delete("f");
    }

    const queryString = params.toString();
    router.replace(queryString ? `${pathname}?${queryString}` : pathname, {
      scroll: false,
    });
  }, [pathname, router, searchParams, tokens]);

  return { selectedFilters, toggleFilter, clearFilters };
};

export default useFilterParams;
