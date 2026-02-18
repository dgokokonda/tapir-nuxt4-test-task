import { API } from "@/constants/api";

export const useCatalogRoute = () => {
  const route = useRoute();
  const router = useRouter();

  const page = ref<number>(1);
  const limit = ref<number>(API.LIMIT);
  const updatingFromStore = ref<boolean>(false);

  const initFromRoute = () => {
    if (route.query?.limit) {
      limit.value = +route.query.limit;
    }
    if (route.query?.page) {
      page.value = +route.query.page;
    }

    router.push({
      path: route.path,
      query: {
        limit: limit.value.toString(),
      },
    });
  };

  const updateRoute = (newPage: number, newLimit?: number) => {
    const query: Record<string, string> = {
      page: newPage.toString(),
      limit: limit.value.toString(),
    };

    if (newLimit) {
      query.limit = newLimit.toString();
    }

    router.push({
      path: route.path,
      query,
    });
  };

  const watchRoute = (
    callback: (urlPage: number, urlLimit: number) => Promise<void>,
  ) => {
    watch(
      () => route.query,
      async (newQuery) => {
        if (updatingFromStore.value) return;

        const urlPage = newQuery.page ? +newQuery.page : 1;
        const urlLimit = newQuery.limit ? +newQuery.limit : API.LIMIT;

        if (urlPage !== page.value || urlLimit !== limit.value) {
          page.value = urlPage;
          limit.value = urlLimit;

          await callback(urlPage, urlLimit);
        }
      },
    );
  };

  const updateWithFlag = (newPage: number, newLimit?: number) => {
    updatingFromStore.value = true;
    updateRoute(newPage, newLimit);
    setTimeout(() => {
      updatingFromStore.value = false;
    }, 100);
  };

  return {
    page,
    limit,
    updatingFromStore: readonly(updatingFromStore),

    initFromRoute,
    updateRoute,
    updateWithFlag,
    watchRoute,
  };
};
