export type RandomPhotoOptions = {
  page?: number;
  perPage?: number;
  topics?: string;
  collections?: string;
};

export type RandomPhoto = {
  __typename: string;
  id: string;
  width: number;
  height: number;
  color: string;
  blur_hash: string;
  description: string;
  likes: number;
  user: User;
  urls: Urls;
};

type User = {
  __typename: string;
  id: string;
  name: string;
  username: string;
  portfolio_url: string;
  bio: string;
  total_photos: number;
  total_likes: number;
  profile_image: ProfileImage;
};

type ProfileImage = {
  __typename: string;
  small: string;
  medium: string;
  large: string;
};

type Urls = {
  raw: string;
  full: string;
  regular: string;
  small: string;
  small_s3: string;
  thumb: string;
};
