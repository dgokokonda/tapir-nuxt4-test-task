import type { Product } from "~/types/product";

export function useImageOrientation(product: Product) {
  const imageClass = ref<string>("");

  const preloadImage = async (src: string): Promise<boolean> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const ratio = img.naturalWidth / img.naturalHeight;
        imageClass.value =
          ratio > 1.2
            ? "product-card__image--landscape"
            : "product-card__image--square";
        resolve(true);
      };
      img.onerror = () => {
        imageClass.value = "product-card__image--square";
        resolve(false);
      };
      img.src = src;
    });
  };

  onMounted(() => {
    preloadImage(product.image);
  });

  return {
    imageClass,
    preloadImage,
  };
}
