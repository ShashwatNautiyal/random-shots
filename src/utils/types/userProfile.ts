export type UserProfileOptions = {
  username: string;
};

export interface UserProfile {
  id: string;
  tags: Tags;
  username: string;
  profile_image: ProfileImage;
  name: string;
  total_photos: number;
  following_count: number;
  followers_count: number;
  bio: string;
  portfolio_url: string;
  social: Social;
}

interface Tags {
  aggregated: Aggregated[];
}

interface Aggregated {
  title: string;
  source?: Source;
}

interface Source {
  cover_photo: CoverPhoto;
  title: string;
}

interface CoverPhoto {
  urls: Urls;
}

interface Urls {
  raw: string;
  full: string;
  regular: string;
  small: string;
  thumb: string;
  small_s3: string;
}

interface ProfileImage {
  small: string;
  medium: string;
  large: string;
}

interface Social {
  portfolio_url: string;
}
