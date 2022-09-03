import { gql } from '@apollo/client';

export const TOPICS = gql`
  query Topics($page: Int, $perPage: Int, $orderBy: OrderByOptions) {
    topics(page: $page, per_page: $perPage, order_by: $orderBy) {
      pageInfo {
        hasNextPage
        nextPage
        totalPages
        totalCount
      }
      result {
        id
        title
        cover_photo {
          id
          color
          blur_hash
          urls {
            raw
            full
            regular
            small
            thumb
            small_s3
          }
        }
      }
    }
  }
`;

export const TOPIC_IDS = gql`
  query Topics($page: Int, $perPage: Int, $orderBy: OrderByOptions) {
    topics(page: $page, per_page: $perPage, order_by: $orderBy) {
      pageInfo {
        hasNextPage
        nextPage
        totalPages
        totalCount
      }
      result {
        id
      }
    }
  }
`;
