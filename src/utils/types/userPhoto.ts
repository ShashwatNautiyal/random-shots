export interface UserPhotosOptions {
  username: string;
  page?: number;
  perPage?: number;
  orientation?: "latest" | "oldest" | "popular" | "views" | "downloads" | "featured" | "position";
  orderBy?: "latest" | "oldest" | "popular";
}

export interface UserPhoto {
  blur_hash: string;
  id: string;
  description: any;
  alt_description: any;
  urls: Urls;
  color: string;
  likes: number;
}

interface Urls {
  raw: string;
  full: string;
  regular: string;
  small: string;
  thumb: string;
  small_s3: string;
}
