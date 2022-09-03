import {
    GetStaticPaths,
    GetStaticPropsContext,
    InferGetStaticPropsType,
} from 'next';

import client from '../../src/apollo';
import { TOPIC_PHOTOS } from '../../src/utils/graphql/topicPhotos';
import { TOPIC_IDS } from '../../src/utils/graphql/topics';
import { USER_PHOTOS } from '../../src/utils/graphql/userPhotos';
import { USER_PROFILE } from '../../src/utils/graphql/userProfile';
import { ApolloResponse } from '../../src/utils/types';
import {
    Topic,
    TopicOption,
} from '../../src/utils/types/topic';
import { TopicPhotosOption } from '../../src/utils/types/topicPhoto';
import {
    UserPhoto,
    UserPhotosOptions,
} from '../../src/utils/types/userPhoto';
import {
    UserProfile,
    UserProfileOptions,
} from '../../src/utils/types/userProfile';
import Profile from '../../src/views/Profile';

const UserPage = ({ user, userPhotos }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Profile user={user} userPhotos={userPhotos} />
    </>
  );
};

const getUserNamesFromTopicId = async (topicId: string) => {
  return await client.query<
    ApolloResponse<"topicPhotos", { user: { id: string; username: string } }[]>,
    TopicPhotosOption
  >({
    query: TOPIC_PHOTOS,
    variables: {
      topicIdOrSlug: topicId,
      page: 1,
      perPage: 18
    }
  });
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

  const userNamesResponses = await Promise.all([
    ...data.topics.result.map(({ id }) => getUserNamesFromTopicId(id))
  ]);

  let userNames: string[] = [];

  // Get the paths we want to pre-render based on topicId
  userNamesResponses.flat().forEach((item) =>
    item.data.topicPhotos.result.forEach((topicPhoto) => {
      userNames.push(topicPhoto.user.username);
    })
  );

  const paths = userNames.map((username) => ({
    params: { username }
  }));

  return { paths, fallback: "blocking" };
};

export const getStaticProps = async ({ params }: GetStaticPropsContext<{ username: string }>) => {
  const { data: userProfileData } = await client.query<
    Record<"userProfile", UserProfile>,
    UserProfileOptions
  >({
    query: USER_PROFILE,
    variables: {
      username: params?.username ?? ""
    }
  });

  const { data: userPhotosData } = await client.query<
    ApolloResponse<"userPhotos", UserPhoto[]>,
    UserPhotosOptions
  >({
    query: USER_PHOTOS,
    variables: {
      page: 1,
      perPage: 9,
      username: params?.username ?? ""
    }
  });

  return {
    props: {
      user: userProfileData.userProfile,
      userPhotos: userPhotosData.userPhotos.result
    },
    revalidate: 60
  };
};

export default UserPage;
