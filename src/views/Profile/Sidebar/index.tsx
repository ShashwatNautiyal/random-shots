import { useState } from 'react';

import Image from '../../../common/Image';
import PrimaryButton from '../../../common/PrimaryButton';
import { UserProfile } from '../../../utils/types/userProfile';

type SidebarProps = {
  user: UserProfile | undefined;
};

export const Sidebar = (props: SidebarProps) => {
  const { user } = props;
  const stories = user?.tags.aggregated.filter((item) => item.source !== undefined).slice(0, 12);

  const [isFollowing, setIsFollowing] = useState(false);

  const imageCustomStyles = {
    borderRadius: "9999px",
    border: "2px solid #cccccc"
  };

  const userProfileCustomStyles = {
    borderRadius: "9999px",
    border: "2px solid black"
  };

  return (
    <div className="flex flex-col xl:w-[400px] lg:w-[300px] w-full flex-shrink-0 px-6 lg:h-fit lg:sticky lg:top-28 will-change-scroll">
      <div className="flex justify-center">
        <div className="h-16 w-16">
          <Image
            showBlur={false}
            imageCustomStyles={userProfileCustomStyles}
            urls={user?.profile_image}
            src={user?.profile_image.medium ?? ""}
            loading="eager"
            alt={user?.name ?? "unknown_user"}
          />
        </div>
      </div>

      <div className="flex justify-between my-5">
        <div className="flex flex-col text-center flex-1">
          <p className="text-lg font-semibold">{user?.total_photos}</p>
          <p className="dark:text-gray-400 text-gray-500">{"posts"}</p>
        </div>

        <div className="flex flex-col text-center flex-1">
          <p className="text-lg font-semibold">{user?.followers_count}</p>
          <p className="dark:text-gray-400 text-gray-500">{"followers"}</p>
        </div>

        <div className="flex flex-col text-center flex-1">
          <p className="text-lg font-semibold">{user?.following_count}</p>
          <p className="dark:text-gray-400 text-gray-500">{"following"}</p>
        </div>
      </div>
      <PrimaryButton
        onClick={() => {
          setIsFollowing((prev) => !prev);
        }}
        text={isFollowing ? "Following" : "Follow"}
        bgColor={isFollowing ? "bg-white" : "bg-blue-600"}
        textColor={isFollowing ? "text-black" : "text-white"}
        borderColor={isFollowing ? "border-black" : "border-transparent"}
      />

      <div className="mt-8">
        <h1 className="font-semibold">{user?.name}</h1>

        <h2 className="my-1">{user?.bio}</h2>

        <a rel="noreferrer" href={user?.portfolio_url} target="_blank" referrerPolicy="no-referrer">
          <p className="text-blue-600 whitespace-nowrap overflow-hidden xl:w-[380px] lg:w-[280px] w-full text-ellipsis">
            {user?.social.portfolio_url}
          </p>
        </a>
      </div>

      <div className="lg:grid lg:grid-cols-3 lg:gap-3 flex gap-10 overflow-scroll py-8">
        {stories?.map(
          (tag, index) =>
            tag.source && (
              <div key={index} className="flex flex-col text-center gap-2">
                <div className="h-16 w-16 mx-auto">
                  <Image
                    showBlur={false}
                    objectFit={"cover"}
                    imageCustomStyles={imageCustomStyles}
                    urls={tag.source.cover_photo.urls}
                    loading="eager"
                    alt={tag.title ?? "unspash_photo"}
                    src={tag.source.cover_photo.urls.small}
                  />
                </div>
                <h3 className="text-sm">{tag.title}</h3>
              </div>
            )
        )}
      </div>
    </div>
  );
};
