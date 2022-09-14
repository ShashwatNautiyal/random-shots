import Head from 'next/head';

import { UserPhoto } from '../../utils/types/userPhoto';
import { UserProfile } from '../../utils/types/userProfile';
import { ProfileFeed } from './ProfileFeed';
import { Sidebar } from './Sidebar';

const Profile = ({ user, userPhotos }: { user: UserProfile; userPhotos: UserPhoto[] }) => {
  return (
    <div className="flex py-8 lg:flex-row flex-col">
        <Head>
            <title>{user.name ?? "Unkown user"}</title> 
            <meta name="description" content={user.bio ?? "Random Shots is a Beautiful, free images and photos that you can download and use for any project. Better than any royalty free or stock photos."} />   
        </Head>
      <Sidebar user={user} />
      <ProfileFeed userPhotos={userPhotos} username={user.username} />
    </div>
  );
};

export default Profile;
