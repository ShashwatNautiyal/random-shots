import { InferGetStaticPropsType } from 'next';

import client from '../src/apollo';
import { RANDOM_PHOTOS } from '../src/utils/graphql/randomPhotos';
import { TOPICS } from '../src/utils/graphql/topics';
import { ApolloResponse } from '../src/utils/types';
import {
    RandomPhoto,
    RandomPhotoOptions,
} from '../src/utils/types/randomPhoto';
import {
    Topic,
    TopicOption,
} from '../src/utils/types/topic';
import Home from '../src/views/Home/index';

const HomePage = ({ randomPhotos, topics }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Home randomPhotos={randomPhotos} topics={topics} />
    </>
  );
};

export const getStaticProps = async () => {
  const { data: topicsData } = await client.query<ApolloResponse<"topics", Topic[]>, TopicOption>({
    query: TOPICS,
    variables: {
      page: 1,
      perPage: 10
    }
  });

  const { data: randomPhotosData } = await client.query<
    ApolloResponse<"randomPhotos", RandomPhoto[]>,
    RandomPhotoOptions
  >({
    query: RANDOM_PHOTOS,
    variables: {
      page: 1,
      perPage: 18
    }
  });

  return {
    props: {
      topics: topicsData.topics.result,
      randomPhotos: randomPhotosData.randomPhotos.result
    }
  };
};

export default HomePage;
