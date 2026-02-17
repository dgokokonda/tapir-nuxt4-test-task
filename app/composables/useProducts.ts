import type { Product, ProductsResponse, FetchError } from "~/types/product";
import { API } from "~/constants/api";

export const useProducts = () => {
  const products = ref<Product[]>([]);
  const loading = ref<boolean>(false);
  const error = ref<string | null>(null);
  const page = ref<number>(1);
  const hasMore = ref<boolean>(true);
  const total = ref<number>(0);
  const limit = ref<number>(16);

  const isLoading = computed(() => loading.value);
  const hasError = computed(() => error.value !== null);
  const productsCount = computed(() => products.value.length);

  const fetchProducts = async (
    pageNum: number = page.value,
    append: boolean = true,
  ) => {
    if (loading.value) return;

    loading.value = true;
    error.value = null;

    try {
      const url = new URL(`${API.BASE_URL}${API.PRODUCTS}`);
      url.searchParams.append("page", pageNum.toString());
      url.searchParams.append("limit", limit.value.toString());

      const response = await $fetch<ProductsResponse>(url.toString());
      if (!response) throw new Error("Error fetching products");

      if (append && pageNum > 1) {
        products.value = [...products.value, ...response.products];
      } else {
        products.value = response.products;
      }

      page.value = pageNum;
      hasMore.value = response.currentPage < response.totalPages;
      total.value = response.total;
    } catch (err: unknown) {
      console.error("Error fetching products:", err);

      if (!err || typeof err !== "object") {
        error.value = "Произошла ошибка при загрузке товаров";
        return;
      }

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
    } finally {
      loading.value = false;
    }
  };

  const fetchFirstPage = async () => {
    page.value = 1;
    await fetchProducts(1, false);
  };

  const loadMore = async () => {
    if (!hasMore.value || loading.value) return;
    await fetchProducts(page.value + 1, true);
  };

  const retry = async () => {
    await fetchProducts(page.value, page.value > 1);
  };

  const reset = () => {
    products.value = [];
    page.value = 1;
    hasMore.value = true;
    error.value = null;
    loading.value = false;
    total.value = 0;
  };

  return {
    products,
    loading,
    error,
    page,
    hasMore,
    total,
    limit,

    isLoading,
    hasError,
    productsCount,

    fetchProducts,
    fetchFirstPage,
    loadMore,
    retry,
    reset,
  };
};
