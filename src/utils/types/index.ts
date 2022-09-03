export type ApolloResponse<K extends string, T> = {
  [J in K]: PaginatedResponse<T>;
};

type PaginatedResponse<T> = {
  result: T;
  pageInfo: PageInfo;
};

type PageInfo = {
  hasNextPage: boolean;
  nextPage?: number;
  totalCount: number;
  totalPages: number;
};
