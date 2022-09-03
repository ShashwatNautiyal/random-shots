import { UserPhoto } from '../../utils/types/userPhoto';
import { UserProfile } from '../../utils/types/userProfile';
import { ProfileFeed } from './ProfileFeed';
import { Sidebar } from './Sidebar';

const Profile = ({ user, userPhotos }: { user: UserProfile; userPhotos: UserPhoto[] }) => {
  return (
    <div className="flex py-8 lg:flex-row flex-col">
      <Sidebar user={user} />
      <ProfileFeed userPhotos={userPhotos} username={user.username} />
    </div>
  );
};

export default Profile;
