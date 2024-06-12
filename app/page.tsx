import Link from 'next/link';
import { fetchUsers } from '../services/api';

type User = {
  id: number;
  name: string;
};

const pastelColors = [
  'f4cccc', 'fce5cd', 'fff2cc', 'd9ead3', 'd0e0e3', 'cfe2f3', 'd9d2e9', 'ead1dc'
];

const getRandomColor = () => {
  return pastelColors[Math.floor(Math.random() * pastelColors.length)];
};

export default async function Home() {
  const users: User[] = await fetchUsers();

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="bg-[#1c1c1e] shadow-xl rounded-lg p-6 sm:w-full max-w-2xl">
        <h1 className="text-3xl font-semibold mb-4">Users</h1>
        <ul className="divide-y divide-gray-700">
          {users.map(user => (
            <li key={user.id} className="py-4 flex items-center justify-between">
              <div className="flex-1 text-lg">
                {user.name}
              </div>
              <Link href={`/users/${user.id}`} className="text-blue-400 hover:text-blue-600 font-medium">
                View Details
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}