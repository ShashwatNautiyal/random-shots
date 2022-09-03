import { gql } from '@apollo/client';

export const TOPIC_PHOTOS = gql`
  query TopicPhotos(
    $topicIdOrSlug: String!
    $page: Int
    $perPage: Int
    $orientation: OrientationOption
    $orderBy: OrderByOption
  ) {
    topicPhotos(
      topicIdOrSlug: $topicIdOrSlug
      page: $page
      per_page: $perPage
      orientation: $orientation
      order_by: $orderBy
    ) {
      result {
        id
        user {
          name
          id
          username
          portfolio_url
          bio
          total_photos
          total_likes
          profile_image {
            small
            medium
            large
          }
        }
        width
        height
        color
        blur_hash
        likes
        urls {
          raw
          full
          regular
          small
          thumb
          small_s3
        }
      }
      pageInfo {
        hasNextPage
        nextPage
        totalPages
        totalCount
      }
    }
  }
`;
