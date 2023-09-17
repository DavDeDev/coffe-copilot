import { getUsers } from '@/lib/actions/users.actions';
import { useState, useEffect } from 'react';
import UserCard from '../ui/user-card';
import React from 'react';

const Grid = () => {
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
    <div className="grid grid-cols-1 md:grid-cols-5 m-5 gap-7">
      {new Array(4).fill(0).map(i => {
        return users.map((user) => (
          <UserCard
            key={user.id}
            id={user.id}
            imageUrl={user.image_url}
            name={user.name}
            shortBio={user.short_bio}
          />
        ))
      })}
      
    </div>
  );
};

export default Grid;
