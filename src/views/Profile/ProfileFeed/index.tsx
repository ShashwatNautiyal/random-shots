import {
    NetworkStatus,
    useQuery,
} from '@apollo/client';

import Image from '../../../common/Image';
import InfiniteScroll from '../../../common/InfiniteScroll';
import { LikeButton } from '../../../common/LikeButton';
import { USER_PHOTOS } from '../../../utils/graphql/userPhotos';
import { classNames } from '../../../utils/helpers';
import { ApolloResponse } from '../../../utils/types';
import {
    UserPhoto,
    UserPhotosOptions,
} from '../../../utils/types/userPhoto';

export const ProfileFeed = ({
  userPhotos,
  username
}: {
  userPhotos: UserPhoto[];
  username: string;
}) => {
  const { data, loading, error, networkStatus, fetchMore } = useQuery<
    ApolloResponse<"userPhotos", UserPhoto[]>,
    UserPhotosOptions
  >(USER_PHOTOS, {
    notifyOnNetworkStatusChange: true,
    variables: {
      page: 2,
      perPage: 9,
      username
    }
  });

  if (userPhotos && userPhotos.length === 0) {
    return <p className="text-lg">This user has not posted anything yet</p>;
  }

  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="grid md:grid-cols-3 sm:grid-cols-2 px-4 gap-5 max-w-[1500px]">
        {userPhotos.map((photo) => (
          <div key={photo.id} className="relative min-h-full min-w-full aspect-square">
            <Image
              blurHash={photo.blur_hash}
              loading="eager"
              alt={photo.description ?? ""}
              objectFit="cover"
              src={photo.urls.small}
              urls={photo.urls}
              className={classNames("block h-full w-full cursor-pointer")}
            />
            <LikeButton
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                margin: "0.5rem"
              }}
              photo={photo}
            />
          </div>
        ))}
      </div>

      <InfiniteScroll
        loading={loading && NetworkStatus.loading === networkStatus}
        error={error}
        fetchNextPage={() => {
          fetchMore({
            variables: {
              page: data?.userPhotos.pageInfo.nextPage
            },
            updateQuery: (previousResult, { fetchMoreResult }) => {
              if (!fetchMoreResult) {
                return previousResult;
              }

              return {
                userPhotos: {
                  pageInfo: fetchMoreResult.userPhotos.pageInfo,
                  result: [
                    ...previousResult.userPhotos.result,
                    ...fetchMoreResult.userPhotos.result
                  ]
                }
              };
            }
          });
        }}
        hasNextPage={data?.userPhotos.pageInfo.hasNextPage ?? false}
        isFetchingNextPage={loading && NetworkStatus.fetchMore === networkStatus}
        loadingLayout={
          <div className="xl:w-10/12 w-full max-w-[1400px] mx-auto">
            {
              <div className="p-2">
                <div
                  style={{ borderTopColor: "transparent" }}
                  className="w-16 h-16 border-4 border-gray-400 border-solid rounded-full animate-spin mx-auto mt-5"
                ></div>
              </div>
            }
          </div>
        }
      >
        <div className="grid md:grid-cols-3 sm:grid-cols-2 px-4 gap-5 max-w-[1500px]">
          {data?.userPhotos.result.map((photo) => (
            <div key={photo.id} className="relative min-h-full min-w-full aspect-square">
              <Image
                blurHash={photo.blur_hash}
                loading="lazy"
                alt={photo.description ?? ""}
                objectFit="cover"
                src={photo.urls.small}
                urls={photo.urls}
                className={classNames("block h-full w-full cursor-pointer")}
              />
              <LikeButton
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  margin: "0.5rem"
                }}
                photo={photo}
              />
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};
