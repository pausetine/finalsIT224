"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "@/lib/api"; // API helper
import { UserCard } from "./UserCard"; 


const UsersPage = () => {
    const { data: users, isLoading, error } = useQuery({
      queryKey: ["users"],  // previous '["users"]'
      queryFn: fetchUsers   // previous 'fetchUsers'
    });
  
    if (isLoading) return <p>Loading...</p>;
    if (error instanceof Error) return <p>Error: {error.message}</p>;
  
    return (
      <div>
        <h1>User List</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {users?.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      </div>
    );
  };
  

export default UsersPage;
