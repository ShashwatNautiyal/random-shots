import React, {
    useEffect,
    useRef,
    useState,
} from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

import Image from '../../../common/Image';
import { classNames } from '../../../utils/helpers';
import { Topic } from '../../../utils/types/topic';

type TopicBarProps = {
  topics: Topic[];
};

const TopicBar = (props: TopicBarProps) => {
  const { topics } = props;
  const { query } = useRouter();
  let { topicId } = query;

  const underlineRef = useRef<HTMLAnchorElement>(null);

  const [underlineWidth, setUnderlineWidth] = useState(0);
  const [underlineOffsetWidth, setUnderlineOffsetWidth] = useState(0);

  useEffect(() => {
    if (underlineRef.current) {
      setUnderlineOffsetWidth(underlineRef.current.offsetLeft);
      setUnderlineWidth(underlineRef.current.offsetWidth);
    } else if (!topicId) {
      setUnderlineOffsetWidth(0);
      setUnderlineWidth(0);
    }
  }, []);

  return (
    <div className="flex xl:justify-center justify-start md:pt-8 pt-4 md:pb-6 pb-3 overflow-x-scroll no-scrollbar">
      <div className={classNames("relative inline-flex py-1")}>
        {topics.map((topic) => (
          <Link key={topic.id} passHref href={"/topic/" + `${topic.id}`}>
            <a
              ref={topicId === topic.id ? underlineRef : null}
              onClick={(e) => {
                // @ts-ignore
                setUnderlineOffsetWidth(e.target.offsetLeft);
                // @ts-ignore
                setUnderlineWidth(e.target.offsetWidth);
              }}
              className="flex px-3 flex-col text-center text-sm gap-3 flex-shrink-0"
            >
              <Image
                src={topic.cover_photo.urls.regular}
                imageCustomStyles={{ borderRadius: "4px" }}
                showBlur={false}
                loading="lazy"
                urls={topic.cover_photo.urls}
                alt={topic.title ?? "Topic"}
                className={classNames("object-cover h-14 aspect-video w-auto pointer-events-none")}
                objectFit={"cover"}
              />
              <span
                className={classNames(
                  topicId === topic.id
                    ? "dark:text-white  text-gray-900"
                    : "dark:text-gray-300  text-gray-600",
                  "whitespace-nowrap transition-all duration-500 pointer-events-none"
                )}
              >
                {topic.title}
              </span>
            </a>
          </Link>
        ))}
        {topicId && (
          <div
            style={{
              width: `${underlineWidth ? underlineWidth - 20 : 0}px`,
              transform: `translateX(${underlineOffsetWidth + 10}px)`
            }}
            className="block h-0.5 rounded-sm absolute bottom-0 dark:bg-white  bg-gray-900 transition-all duration-500"
          ></div>
        )}
      </div>
    </div>
  );
};

export default TopicBar;
