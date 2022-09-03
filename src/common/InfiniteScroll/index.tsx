import {
    ReactNode,
    useEffect,
} from 'react';

import { useInView } from 'react-intersection-observer';

import { ApolloError } from '@apollo/client';

type InfiniteScrollProps = {
  children: ReactNode;
  loadingLayout?: ReactNode;
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  loading: boolean;
  error: ApolloError | undefined;
};

const InfiniteScroll = (props: InfiniteScrollProps) => {
  const {
    children,
    loadingLayout,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    loading,
    error
  } = props;

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <>
      {loading === true && <>{loadingLayout}</>}
      {loading === false && <>{children}</>}
      {hasNextPage && <div ref={ref}>{loadingLayout}</div>}
    </>
  );
};

export default InfiniteScroll;
