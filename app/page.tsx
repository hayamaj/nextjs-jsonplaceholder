import Link from 'next/link';
import { fetchUsers } from '../services/api';
import { ChevronRightIcon } from '@heroicons/react/solid';

type User = {
  id: number;
  name: string;
};

const lightBlueColor = 'cfe2f3'; // Assign a specific pastel light blue color

export default async function Home() {
  const users: User[] = await fetchUsers();

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="bg-[#1c1c1e] shadow-xl rounded-lg p-8 w-full max-w-2xl">
        <h1 className="text-3xl font-semibold mb-4">Users</h1>
        <ul className="divide-y divide-gray-700">
          {users.map(user => (
            <li key={user.id} className="py-4 flex items-center justify-between">
              <div className="flex-1 text-lg text-center sm:text-left">
                {user.name}
              </div>
              <Link href={`/users/${user.id}`} className="text-blue-400 hover:text-blue-600 font-medium sm:block">
                <span className="hidden sm:inline">View Details</span>
                <span className="inline sm:hidden"><ChevronRightIcon className="w-5 h-5 inline sm:hidden" /></span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}