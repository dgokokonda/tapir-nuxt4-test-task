export interface Product {
  id: number;
  image: string;
  name: string;
  price: number;
}

export interface ProductsResponse {
  currentPage: number;
  limit: number;
  products: Product[];
  total: number;
  totalPages: number;
}

export interface FetchError extends Error {
  response?: {
    status: number;
    statusText: string;
    _data?: unknown;
  };
  request?: Request;
  data?: unknown;
}
