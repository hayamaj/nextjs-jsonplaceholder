import Link from 'next/link';
import { fetchUsers } from '../services/api';

type User = {
  id: number;
  name: string;
};

export default async function Home() {
  const users: User[] = await fetchUsers();

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-2xl">
        <h1 className="text-2xl font-semibold mb-4">Users</h1>
        <ul className="divide-y divide-gray-200">
          {users.map(user => (
            <li key={user.id} className="py-4 flex items-center">
              <div className="flex-1">
                <Link href={`/users/${user.id}`} className="text-blue-600 hover:text-blue-800 font-medium">
                  {user.name}
                </Link>
              </div>
              <Link href={`/users/${user.id}`} className="text-blue-300 hover:text-blue-800 font-medium">
                View Details
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}