import { gql } from '@apollo/client';

export const RANDOM_PHOTOS = gql`
  query RandomPhotos($page: Int, $perPage: Int, $topics: String, $collections: String) {
    randomPhotos(page: $page, per_page: $perPage, topics: $topics, collections: $collections) {
      pageInfo {
        hasNextPage
        nextPage
        totalPages
        totalCount
      }
      result {
        id
        width
        height
        color
        blur_hash
        description
        likes
        urls {
          raw
          full
          regular
          small
          thumb
          small_s3
        }
        user {
          id
          name
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
      }
    }
  }
`;
