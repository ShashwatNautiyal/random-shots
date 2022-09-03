import {
    GetStaticPaths,
    GetStaticPropsContext,
    InferGetStaticPropsType,
} from 'next';

import client from '../../src/apollo';
import { TOPIC_PHOTOS } from '../../src/utils/graphql/topicPhotos';
import {
    TOPIC_IDS,
    TOPICS,
} from '../../src/utils/graphql/topics';
import { ApolloResponse } from '../../src/utils/types';
import {
    Topic,
    TopicOption,
} from '../../src/utils/types/topic';
import {
    TopicPhoto,
    TopicPhotosOption,
} from '../../src/utils/types/topicPhoto';
import Home from '../../src/views/Home';

const HomePage = ({ topicPhotos, topics }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Home topicPhotos={topicPhotos} topics={topics} />
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await client.query<
    ApolloResponse<"topics", Omit<Topic, "title" | "cover_photo">[]>,
    TopicOption
  >({
    query: TOPIC_IDS,
    variables: {
      page: 1,
      perPage: 10,
      orderBy: "latest"
    }
  });

  // Get the paths we want to pre-render based on topicId
  const paths = data.topics.result.map((topic) => ({
    params: { topicId: topic.id }
  }));

  return { paths, fallback: "blocking" };
};

export const getStaticProps = async ({ params }: GetStaticPropsContext<{ topicId: string }>) => {
  const { data: topicPhotosData } = await client.query<
    ApolloResponse<"topicPhotos", TopicPhoto[]>,
    TopicPhotosOption
  >({
    query: TOPIC_PHOTOS,
    variables: {
      topicIdOrSlug: params?.topicId ?? "",
      page: 1,
      perPage: 18
    }
  });

  const { data: topicsData } = await client.query<ApolloResponse<"topics", Topic[]>, TopicOption>({
    query: TOPICS,
    variables: {
      page: 1,
      perPage: 10
    }
  });

  return {
    props: {
      topicPhotos: topicPhotosData.topicPhotos.result,
      topics: topicsData.topics.result
    },
    revalidate: 60
  };
};

export default HomePage;
