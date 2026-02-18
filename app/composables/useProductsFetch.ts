import type { ProductsResponse } from "~/types/product";
import { API } from "@/constants/api";

export const useProductsFetch = () => {
  const buildApiUrl = (pageNum: number, limit: number): string => {
    const url = new URL(`${API.BASE_URL}${API.PRODUCTS}`);
    url.searchParams.append("page", pageNum.toString());
    url.searchParams.append("limit", limit.toString());
    return url.toString();
  };

  interface SSRResult {
    data: ProductsResponse | null;
    error: unknown;
  }

  const fetchProductsSSR = async (
    pageNum: number,
    limit: number,
  ): Promise<SSRResult> => {
    const url = buildApiUrl(pageNum, limit);

    try {
      const { data, error } = await useFetch<ProductsResponse>(url, {
        key: `products-${pageNum}-${limit}`,
        server: true,
        lazy: false,
      });

      if (error.value) {
        throw error.value;
      }

      return {
        data: data.value || null,
        error: error.value,
      };
    } catch (err) {
      console.error("SSR fetch error:", err);
      throw err;
    }
  };

  const fetchProductsClient = async (
    pageNum: number,
    limit: number,
  ): Promise<ProductsResponse> => {
    const url = buildApiUrl(pageNum, limit);
    return await $fetch<ProductsResponse>(url);
  };

  return {
    fetchProductsSSR,
    fetchProductsClient,
  };
};
