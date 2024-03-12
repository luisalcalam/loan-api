import { Pagination } from './pagination';
export interface FindAllResponse<T> {
  content: T;
  pagination?: Pagination;
}
