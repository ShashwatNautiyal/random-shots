import Head from 'next/head';

import { RandomPhoto } from '../../utils/types/randomPhoto';
import { Topic } from '../../utils/types/topic';
import { TopicPhoto } from '../../utils/types/topicPhoto';
import { HomeFeed } from './HomeFeed';
import HomeTopicBar from './TopicBar';
import { TopicFeed } from './TopicFeed';

type HomeProps = {
  topics: Topic[];
  randomPhotos?: RandomPhoto[];
  topicPhotos?: TopicPhoto[];
};

const Home = (props: HomeProps) => {
  const { topics, randomPhotos, topicPhotos } = props;
  return (
    <>
        <Head>
            <title>Random Shots</title> 
            <meta name="description" content="Random Shots is a Beautiful, free images and photos that you can download and use for any project. Better than any royalty free or stock photos." />   
        </Head>
        <HomeTopicBar topics={topics} />
        {randomPhotos && <HomeFeed randomPhotos={randomPhotos} />}
        {topicPhotos && <TopicFeed topicPhotos={topicPhotos} />}
    </>
  );
};

export default Home;
