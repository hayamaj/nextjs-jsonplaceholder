import { fetchUser, fetchUserPosts } from '../../../services/api';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';

type Params = {
  params: {
    id: string;
  };
};

type User = {
  id: number;
  name: string;
};

type Post = {
  id: number;
  title: string;
  userId: number;
};

const pastelColors = [
  'f4cccc', 'fce5cd', 'fff2cc', 'd9ead3', 'd0e0e3', 'cfe2f3', 'd9d2e9', 'ead1dc'
];

const getRandomColor = () => {
  return pastelColors[Math.floor(Math.random() * pastelColors.length)];
};

export default async function User({ params }: Params) {
  const user: User = await fetchUser(parseInt(params.id));
  const posts: Post[] = await fetchUserPosts(parseInt(params.id));
  const profilePicColor = getRandomColor();
  const profilePicUrl = `https://ui-avatars.com/api/?name=${user.name}&background=${profilePicColor}&size=128`;

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="bg-[#1c1c1e] shadow-xl rounded-lg p-6 w-full max-w-2xl">
        <div className="flex items-center justify-between mb-4">
          <Link href="/" className="text-blue-400 hover:text-blue-600 font-medium flex items-center">
            <ArrowLeftIcon className="w-5 h-5 mr-1" />
            Back to Home
          </Link>
        </div>
        <div className="flex items-center mb-4">
          <img
            src={profilePicUrl}
            alt={`${user.name}'s profile picture`}
            className="w-16 h-16 rounded-full mr-4"
          />
          <h1 className="text-3xl font-semibold">{user.name}</h1>
        </div>
        <h2 className="text-2xl font-medium mb-2">Posts</h2>
        <ul className="divide-y divide-gray-700">
          {posts.map(post => (
            <li key={post.id} className="py-4">
              <Link href={`/posts/${post.id}?profilePicUrl=${encodeURIComponent(profilePicUrl)}`} className="text-blue-400 hover:text-blue-600 font-medium">
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}