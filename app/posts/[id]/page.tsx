import axios from 'axios';
import Link from 'next/link';

type Params = {
  params: {
    id: string;
  };
};

type Post = {
  id: number;
  title: string;
  body: string;
  userId: number;
};

export default async function Post({ params }: Params) {
  const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${params.id}`);
  const post: Post = response.data;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-2xl">
        <h1 className="text-2xl font-semibold mb-4">{post.title}</h1>
        <p className="text-gray-700 mb-4">{post.body}</p>
        <div className="mt-4">
          <Link href={`/users/${post.userId}`} className="text-blue-600 hover:text-blue-800 font-medium">
            Back to User
          </Link>
        </div>
      </div>
    </div>
  );
}