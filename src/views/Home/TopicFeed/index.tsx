import {
    Fragment,
    useState,
} from 'react';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import {
    NetworkStatus,
    useQuery,
} from '@apollo/client';

import { ImageWithLabel } from '../../../common/ImageWithLabel';
import { TOPIC_PHOTOS } from '../../../utils/graphql/topicPhotos';
import { classNames } from '../../../utils/helpers';
import { ApolloResponse } from '../../../utils/types';
import {
    TopicPhoto,
    TopicPhotosOption,
} from '../../../utils/types/topicPhoto';

const InfiniteScroll = dynamic(() => import("../../../common/InfiniteScroll"), {
  ssr: false
});

type TopicFeedProps = {
  topicPhotos: TopicPhoto[];
};

export const TopicFeed = (props: TopicFeedProps) => {
  const { topicPhotos } = props;
  const { query } = useRouter();
  const topicId = query.topicId as string;

  const PER_PAGE = 18;

  const { data, loading, error, networkStatus, fetchMore } = useQuery<
    ApolloResponse<"topicPhotos", TopicPhoto[]>,
    TopicPhotosOption
  >(TOPIC_PHOTOS, {
    notifyOnNetworkStatusChange: true,
    variables: {
      page: 2,
      perPage: PER_PAGE,
      topicIdOrSlug: topicId
    }
  });

  const [photo, setPhoto] = useState<TopicPhoto>();
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 px-4 lg:grid-cols-4 gap-5 xl:w-10/12 w-full max-w-[1400px] mx-auto pt-5">
          {topicPhotos.map((topicPhoto, index) => (
            <Fragment key={topicPhoto.id}>
              <ImageWithLabel
                className={classNames(
                  index === 0 || index === 11 ? "col-span-2 row-span-2" : "col-span-1",
                  "h-full w-full aspect-square relative cursor-pointer lg:block hidden"
                )}
                onClick={() => {
                  setPhoto(topicPhoto);
                  setShowModal(true);
                }}
                photo={topicPhoto}
                index={index}
              />
              <ImageWithLabel
                className={classNames(
                  index === 0 || index === 10 ? "md:col-span-2 md:row-span-2" : "col-span-1",
                  "h-full w-full aspect-square relative cursor-pointer lg:hidden block"
                )}
                onClick={() => {
                  setPhoto(topicPhoto);
                  setShowModal(true);
                }}
                photo={topicPhoto}
                index={index}
              />
            </Fragment>
          ))}
        </div>
      }
      <InfiniteScroll
        loading={loading && NetworkStatus.loading === networkStatus}
        error={error}
        fetchNextPage={() => {
          fetchMore({
            variables: {
              page: data?.topicPhotos.pageInfo.nextPage
            },
            updateQuery: (previousResult, { fetchMoreResult }) => {
              if (!fetchMoreResult) {
                return previousResult;
              }

              return {
                topicPhotos: {
                  pageInfo: fetchMoreResult.topicPhotos.pageInfo,
                  result: [
                    ...previousResult.topicPhotos.result,
                    ...fetchMoreResult.topicPhotos.result
                  ]
                }
              };
            }
          });
        }}
        hasNextPage={data?.topicPhotos.pageInfo.hasNextPage ?? false}
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
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 px-4 lg:grid-cols-4 gap-5 xl:w-10/12 w-full max-w-[1400px] mx-auto pt-5">
          {data?.topicPhotos.result.map((topicPhoto, index) => {
            index = index % PER_PAGE;
            return (
              <Fragment key={topicPhoto.id}>
                <ImageWithLabel
                  className={classNames(
                    index === 0 || index === 11 ? "col-span-2 row-span-2" : "col-span-1",
                    "h-full w-full aspect-square relative cursor-pointer lg:block hidden"
                  )}
                  onClick={() => {
                    setPhoto(topicPhoto);
                    setShowModal(true);
                  }}
                  photo={topicPhoto}
                  index={index}
                />
                <ImageWithLabel
                  className={classNames(
                    index === 0 || index === 10 ? "md:col-span-2 md:row-span-2" : "col-span-1",
                    "h-full w-full aspect-square relative cursor-pointer lg:hidden block"
                  )}
                  onClick={() => {
                    setPhoto(topicPhoto);
                    setShowModal(true);
                  }}
                  photo={topicPhoto}
                  index={index}
                />
              </Fragment>
            );
          })}
        </div>
      </InfiniteScroll>
    </>
  );
};
