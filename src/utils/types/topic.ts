export type TopicOption = {
  page?: number;
  perPage?: number;
  orderBy?: "latest" | "oldest" | "popular" | "views" | "downloads" | "featured" | "position";
};

export type Topic = {
  __typename: string;
  id: string;
  title: string;
  cover_photo: CoverPhoto;
};

type CoverPhoto = {
  __typename: string;
  id: string;
  color: string;
  blur_hash: string;
  width: number;
  height: number;
  urls: Urls;
};

type Urls = {
  __typename: string;
  raw: string;
  full: string;
  regular: string;
  small: string;
  thumb: string;
  small_s3: string;
};
