import { defineStore } from "pinia";
import type { Product, FetchError, ProductsResponse } from "~/types/product";
import { API } from "@/constants/api";
import { useProductsFetch } from "~/composables/useProductsFetch";
import { H3Error } from "h3";

export const useProductStore = defineStore("products", () => {
  const products = ref<Product[]>([]);
  const loading = ref<boolean>(false);
  const error = ref<string | null>(null);
  const page = ref<number>(1);
  const limit = ref<number>(API.LIMIT);
  const hasMore = ref<boolean>(true);

  const { fetchProductsSSR, fetchProductsClient } = useProductsFetch();

  const fetchProductsWithSSR = async (pageNum: number) => {
    const result = await fetchProductsSSR(pageNum, limit.value);

    if (result.error) {
      throw result.error;
    }

    return result.data;
  };

  const fetchProductsWithClient = async (pageNum: number) => {
    return await fetchProductsClient(pageNum, limit.value);
  };

  const fetchProducts = async (
    pageNum: number = page.value,
    append: boolean = true,
    ssr: boolean = false,
  ) => {
    if (loading.value) return;

    loading.value = true;
    error.value = null;

    try {
      let response: ProductsResponse | null = null;

      if (ssr) {
        response = await fetchProductsWithSSR(pageNum);
      } else {
        response = await fetchProductsWithClient(pageNum);
      }

      if (!response) throw new Error("Error fetching products");

      if (append && pageNum > 1) {
        products.value = [...products.value, ...response.products];
      } else {
        products.value = response.products;
      }

      page.value = pageNum;
      hasMore.value = response.currentPage < response.totalPages;
    } catch (err: unknown) {
      handleError(err, append);
    } finally {
      loading.value = false;
    }
  };

  const handleError = (err: unknown, append: boolean) => {
    console.error("Error fetching products:", err);

    if (err instanceof H3Error) {
      if (err.statusCode === 404) {
        error.value = "Товары не найдены";
      } else if (err.statusCode === 500) {
        error.value = "Ошибка сервера, попробуйте позже";
      } else {
        error.value = err.message || "Произошла ошибка при загрузке товаров";
      }

      if (!append) {
        products.value = [];
      }
      return;
    }

    if (err && typeof err === "object" && "response" in err) {
      const fetchError = err as FetchError;

      if (fetchError.response?.status === 404) {
        error.value = "Товары не найдены";
      } else if (
        fetchError.message?.includes("Network") ||
        fetchError.message?.includes("Failed to fetch")
      ) {
        error.value = "Ошибка сети, проверьте подключение";
      } else if (fetchError.response?.status === 500) {
        error.value = "Ошибка сервера, попробуйте позже";
      } else {
        error.value =
          fetchError.message || "Произошла ошибка при загрузке товаров";
      }

      if (!append) {
        products.value = [];
      }
      return;
    }

    if (err instanceof Error) {
      error.value = err.message;
    } else {
      error.value = "Произошла ошибка при загрузке товаров";
    }

    if (!append) {
      products.value = [];
    }
  };

  const fetchFirstPageSSR = async () => {
    page.value = 1;
    await fetchProducts(1, false, true);
  };

  const loadMore = async () => {
    if (!hasMore.value || loading.value) return;
    await fetchProducts(page.value + 1, true, false);
  };

  const retry = async () => {
    await fetchProducts(page.value, page.value > 1, false);
  };

  return {
    products,
    loading,
    error,
    page,
    hasMore,
    fetchFirstPageSSR,
    loadMore,
    retry,
  };
});
