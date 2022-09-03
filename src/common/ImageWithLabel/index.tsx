import Link from 'next/link';

import { RandomPhoto } from '../../utils/types/randomPhoto';
import { TopicPhoto } from '../../utils/types/topicPhoto';
import Image from '../Image';

type ImageWithLabelType = {
  photo: RandomPhoto | TopicPhoto;
  index: number;
  onClick: () => void;
  showBlur?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

export const ImageWithLabel = (props: ImageWithLabelType) => {
  const { photo, index, onClick, className, showBlur = true, ...rest } = props;

  return (
    <div {...rest} className={className}>
      <Image
        showBlur={showBlur}
        onClick={onClick}
        className="block h-full select-none"
        src={photo.urls.regular}
        blurHash={photo.blur_hash}
        loading="lazy"
        alt={photo.description}
        objectFit={"cover"}
        urls={photo.urls}
      />

      <Link href={"/user/" + `${photo.user.username}`}>
        <div
          style={{
            background: `${photo.color}aa`
          }}
          className="absolute backdrop-blur w-fit rounded-md m-2 py-2 px-3 bottom-0 flex items-center gap-2"
        >
          <div className="absolute inset-0 bg-black bg-opacity-10 hover:bg-opacity-40 transition-all rounded-md"></div>
          <div className="h-10 w-10 pointer-events-none">
            <Image
              showBlur={showBlur}
              imageCustomStyles={{ borderRadius: "9999px" }}
              loading="lazy"
              alt={photo.user.name}
              objectFit="cover"
              urls={photo.user.profile_image}
              src={photo.user.profile_image.medium}
            />
          </div>
          <p className="text-white z-10 font-medium text-sm pointer-events-none">
            {photo.user.name}
          </p>
        </div>
      </Link>
    </div>
  );
};
