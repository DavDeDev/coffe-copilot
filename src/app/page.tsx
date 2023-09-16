'use client';
import Image from 'next/image';
import UserCard from '@/components/ui/user-card';
import { prisma } from '../lib/cockroachDB';
import { getUser, getUsers } from '../lib/actions/users.actions';
import { useEffect, useState } from 'react';
import Topbar from '@/components/shared/Topbar';

interface User {
  id: number;
  name: string;
  image_url: string;
  short_bio: string;
}

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const userArray = await getUsers();
        setUsers(userArray);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    }

    fetchData();
  }, []);
  return (
    <main className="">
      <Topbar />
      {/* Create a card for each user */}
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        {users.map((user) => (
          <UserCard
            key={user.id}
            id={user.id}
            imageUrl={user.image_url}
            name={user.name}
            shortBio={user.short_bio}
          />
        ))}
      </div>
    </main>
  );
}
