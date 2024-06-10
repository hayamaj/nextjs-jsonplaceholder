import { fetchUser, fetchUserPosts } from '../../../services/api';
import Link from 'next/link';

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

export default async function User({ params }: Params) {
  const user: User = await fetchUser(parseInt(params.id));
  const posts: Post[] = await fetchUserPosts(parseInt(params.id));

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-2xl">
        <h1 className="text-2xl font-semibold mb-4">{user.name}</h1>
        <h2 className="text-xl font-medium mb-2">Posts</h2>
        <ul className="divide-y divide-gray-200">
          {posts.map(post => (
            <li key={post.id} className="py-4">
              <Link href={`/posts/${post.id}`} className="text-blue-600 hover:text-blue-800 font-medium">
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-4">
          <Link href="/" className="text-blue-600 hover:text-blue-800 font-medium">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}