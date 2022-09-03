import { gql } from '@apollo/client';

export const USER_PROFILE = gql`
  query UserProfile($username: String!) {
    userProfile(username: $username) {
      id
      tags {
        aggregated {
          title
          source {
            cover_photo {
              urls {
                raw
                full
                regular
                small
                thumb
                small_s3
              }
            }
            title
          }
        }
      }
      profile_image {
        small
        medium
        large
      }
      username
      name
      total_photos
      following_count
      followers_count
      bio
      portfolio_url
      social {
        portfolio_url
      }
    }
  }
`;
