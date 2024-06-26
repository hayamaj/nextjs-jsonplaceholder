"use client";
import axios from 'axios';
import { ArrowLeftIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

type Post = {
    id: number;
    title: string;
    body: string;
    userId: number;
  };
  
  type User = {
    id: number;
    name: string;
  };
  
  
  const getProfilePicUrl = (userName: string, profilePicUrl?: string) => {
    return profilePicUrl || `https://ui-avatars.com/api/?name=${userName}&background=${'cfe2f3'}&size=64`;
  };
  
  export default function Post({ params }: { params: { id: string } }) {
    const [post, setPost] = useState<Post | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const searchParams = useSearchParams();
    const profilePicUrl = searchParams.get('profilePicUrl');
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const postResponse = await axios.get(`https://jsonplaceholder.typicode.com/posts/${params.id}`);
          const fetchedPost: Post = postResponse.data;
          setPost(fetchedPost);
          const userResponse = await axios.get(`https://jsonplaceholder.typicode.com/users/${fetchedPost.userId}`);
          const fetchedUser: User = userResponse.data;
          setUser(fetchedUser);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
  
      fetchData();
    }, [params.id]);
  
    if (!post || !user) return <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">Loading...</div>;
  
    const profilePic = getProfilePicUrl(user.name, profilePicUrl || undefined);

    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
        <div className="bg-[#1c1c1e] shadow-xl rounded-lg p-6 w-full max-w-2xl">
          <div className="flex items-center justify-between mb-4">
            <Link href={`/users/${post.userId}`} className="text-blue-400 hover:text-blue-600 font-medium flex items-center">
              <ArrowLeftIcon className="w-5 h-5 mr-1" />
              Back to User
            </Link>
          </div>
          <div className="flex items-center mb-4">
            <img
              src={profilePic}
              alt={`${user.name}'s profile picture`}
              className="w-12 h-12 rounded-full mr-2"
            />
            <h1 className="text-xl font-semibold">{user.name}</h1>
          </div>
          <h1 className="text-2xl font-semibold mb-4">{post.title}</h1>
          <p className="text-gray-300 mb-4">{post.body}</p>
        </div>
      </div>
    );
  }