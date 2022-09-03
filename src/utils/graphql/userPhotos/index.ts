import { gql } from '@apollo/client';

export const USER_PHOTOS = gql`
  query UserPhotos(
    $username: String!
    $page: Int
    $perPage: Int
    $orderBy: OrderByOptions
    $orientation: OrientationOptions
  ) {
    userPhotos(
      username: $username
      page: $page
      per_page: $perPage
      order_by: $orderBy
      orientation: $orientation
    ) {
      pageInfo {
        hasNextPage
        nextPage
        totalPages
        totalCount
      }
      result {
        blur_hash
        id
        description
        alt_description
        urls {
          raw
          full
          regular
          small
          thumb
          small_s3
        }
        color
        likes
      }
    }
  }
`;
