export interface IUrlResponse {
  url?: string;
  type?: number;
}
export interface IProductResponse {
  id?: string;
  name?: string;
  urls?: IUrlResponse[];
  description?: string;
  price?: number;
  rating?: number;
  overviews?: string[];
  reviews?: number;
  status?: number;
  tripDuration?: string;
  createdDate?: Date;
  latestUpdate?: Date;
}
export interface IProductListResponse {
  list: IProductResponse[];
  total: number;
  totalPages: number;
  page: number;
  limit: number;
}
export interface IProductCreateResponse {
  message: string;
  productId: string;
}
export interface IProductUpdateResponse {
  message: string;
  productId: string;
}
export interface IProductDeleteResponse {
  message: string;
}
