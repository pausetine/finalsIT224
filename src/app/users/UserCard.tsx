import { FC } from "react";

interface UserCardProps {
  user: {
    id: number;
    name: string;
    username: string;
    email: string;
  };
}

export const UserCard: FC<UserCardProps> = ({ user }) => {
  return (
    <div className="border p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold">{user.name}</h2>
      <p className="text-gray-500">@{user.username}</p>
      <p className="text-gray-700">{user.email}</p>
    </div>
  );
};
