/**
 * API 엔드포인트 상수
 */
const API_ENDPOINTS = {
  MOCKAPI_BASE: "https://690d9707a6d92d83e85226b2.mockapi.io/api",
  STRAPI_BASE: "http://localhost:1337/api",
};

/**
 * Strapi 데이터 정규화 함수
 * Strapi의 data/attributes 구조를 평탄화
 */
export const normalizeStrapiData = (payload) => {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (Array.isArray(payload?.data)) {
    return payload.data.map((item) => {
      const attributes = item?.attributes ? { id: item.id, ...item.attributes } : item;

      // Strapi 컴포넌트 구조 처리: reviewPoint
      if (attributes.reviewPoint) {
        if (attributes.reviewPoint.data) {
          attributes.reviewPoint = Array.isArray(attributes.reviewPoint.data)
            ? attributes.reviewPoint.data[0]?.attributes || attributes.reviewPoint.data[0]
            : attributes.reviewPoint.data?.attributes || attributes.reviewPoint.data;
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
              return Array.isArray(lmo.data)
                ? lmo.data.map((d) => d?.attributes || d)
                : lmo.data?.attributes || lmo.data;
            }
            return lmo;
          });
        } else if (attributes.lmos.data) {
          attributes.lmos = Array.isArray(attributes.lmos.data)
            ? attributes.lmos.data.map((d) => d?.attributes || d)
            : [attributes.lmos.data?.attributes || attributes.lmos.data];
        }
      }

      return attributes;
    });
  }

  return [];
};

/**
 * 브랜드 데이터 가져오기
 */
export const fetchBrandData = async () => {
  try {
    const response = await fetch(`${API_ENDPOINTS.MOCKAPI_BASE}/brand`);
    const data = await response.json();
    // API 응답이 배열인 경우 첫 번째 요소 사용, 아니면 직접 사용
    const brandDataObj = Array.isArray(data) ? data[0] : data;
    // brandData 형태로 변환
    return {
      currentTabId: brandDataObj.currentTabId,
      tabs: brandDataObj.tabs || [],
      brands: brandDataObj.brands || {},
      indexes: brandDataObj.indexes || {},
    };
  } catch (error) {
    console.error("Failed to fetch brand data:", error);
    throw error;
  }
};

/**
 * 카테고리 데이터 가져오기
 */
export const fetchCategories = async () => {
  try {
    const response = await fetch(`${API_ENDPOINTS.MOCKAPI_BASE}/categories`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    throw error;
  }
};

/**
 * 상품 데이터 가져오기 (Fashion Triangles)
 * @param {Object} options - 필터 옵션
 * @param {string} options.categoryCode - 카테고리 코드 (lcode 필터)
 * @param {boolean} options.populate - populate 옵션 (기본값: true)
 * @returns {Promise<Array>} 정규화된 상품 배열
 */
export const fetchFashionTriangles = async ({ categoryCode, populate = true } = {}) => {
  try {
    const apiUrl = new URL(`${API_ENDPOINTS.STRAPI_BASE}/fashion-triangles`);
    if (populate) {
      apiUrl.searchParams.append("populate", "*");
    }
    if (categoryCode) {
      apiUrl.searchParams.append("filters[lcode][$eq]", categoryCode);
    }

    const response = await fetch(apiUrl.toString());
    const payload = await response.json();
    return normalizeStrapiData(payload);
  } catch (error) {
    console.error("Failed to fetch fashion triangles:", error);
    throw error;
  }
};

