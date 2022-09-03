import { RandomPhoto } from '../../utils/types/randomPhoto';
import { Topic } from '../../utils/types/topic';
import { TopicPhoto } from '../../utils/types/topicPhoto';
import { HomeFeed } from './HomeFeed';
import HomeTopicBar from './HomeTopicBar';
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
      <HomeTopicBar topics={topics} />
      {randomPhotos && <HomeFeed randomPhotos={randomPhotos} />}
      {topicPhotos && <TopicFeed topicPhotos={topicPhotos} />}
    </>
  );
};

export default Home;
