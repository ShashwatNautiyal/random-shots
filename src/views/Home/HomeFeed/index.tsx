import {
    Fragment,
    useState,
} from 'react';

import dynamic from 'next/dynamic';

import {
    NetworkStatus,
    useQuery,
} from '@apollo/client';

import { ImageWithLabel } from '../../../common/ImageWithLabel';
import { RANDOM_PHOTOS } from '../../../utils/graphql/randomPhotos';
import { classNames } from '../../../utils/helpers';
import { ApolloResponse } from '../../../utils/types';
import {
    RandomPhoto,
    RandomPhotoOptions,
} from '../../../utils/types/randomPhoto';

const InfiniteScroll = dynamic(() => import("../../../common/InfiniteScroll"), {
  ssr: false
});

type HomeFeedProps = {
  randomPhotos: RandomPhoto[];
};

export const HomeFeed = (props: HomeFeedProps) => {
  const { randomPhotos } = props;

  const { data, loading, error, networkStatus, fetchMore } = useQuery<
    ApolloResponse<"randomPhotos", RandomPhoto[]>,
    RandomPhotoOptions
  >(RANDOM_PHOTOS, {
    notifyOnNetworkStatusChange: true,
    variables: {
      page: 1,
      perPage: 18
    }
  });

  const [photo, setPhoto] = useState<RandomPhoto>();
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 px-4 lg:grid-cols-4 gap-5 xl:w-10/12 w-full max-w-[1400px] mx-auto pt-5">
          {randomPhotos.map((randomPhoto, index) => (
            <Fragment key={randomPhoto.id}>
              <ImageWithLabel
                showBlur={false}
                loading="eager"
                className={classNames(
                  index === 0 || index === 11 ? "col-span-2 row-span-2" : "col-span-1",
                  "h-full w-full aspect-square relative cursor-pointer lg:block hidden"
                )}
                onClick={() => {
                  setPhoto(randomPhoto);
                  setShowModal(true);
                }}
                photo={randomPhoto}
                index={index}
              />
              <ImageWithLabel
                loading="eager"
                showBlur={false}
                className={classNames(
                  index === 0 || index === 10 ? "md:col-span-2 md:row-span-2" : "col-span-1",
                  "h-full w-full aspect-square relative cursor-pointer lg:hidden block"
                )}
                onClick={() => {
                  setPhoto(randomPhoto);
                  setShowModal(true);
                }}
                photo={randomPhoto}
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
              page: data?.randomPhotos.pageInfo.nextPage
            },
            updateQuery: (previousResult, { fetchMoreResult }) => {
              if (!fetchMoreResult) {
                return previousResult;
              }

              return {
                randomPhotos: {
                  pageInfo: fetchMoreResult.randomPhotos.pageInfo,
                  result: [
                    ...previousResult.randomPhotos.result,
                    ...fetchMoreResult.randomPhotos.result
                  ]
                }
              };
            }
          });
        }}
        hasNextPage={data?.randomPhotos.pageInfo.hasNextPage ?? false}
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
          {data?.randomPhotos.result.map((randomPhoto, index) => (
            <Fragment key={randomPhoto.id}>
              <ImageWithLabel
                className={classNames(
                  index === 0 || index % 11 === 0 ? "col-span-2 row-span-2" : "col-span-1",
                  "h-full w-full aspect-square relative cursor-pointer lg:block hidden"
                )}
                onClick={() => {
                  setPhoto(randomPhoto);
                  setShowModal(true);
                }}
                photo={randomPhoto}
                index={index}
              />
              <ImageWithLabel
                className={classNames(
                  index === 0 || index % 10 === 0 ? "md:col-span-2 md:row-span-2" : "col-span-1",
                  "h-full w-full aspect-square relative cursor-pointer lg:hidden block"
                )}
                onClick={() => {
                  setPhoto(randomPhoto);
                  setShowModal(true);
                }}
                photo={randomPhoto}
                index={index}
              />
            </Fragment>
          ))}
        </div>
      </InfiniteScroll>
    </>
  );
};
