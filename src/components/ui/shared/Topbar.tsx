"use client";
import { useQuery } from "@tanstack/react-query";
import { Avatar, AvatarFallback, AvatarImage } from "../avatar";
import { authClient } from "@/lib/auth-client";
import { Skeleton } from "../skeleton";

function Topbar() {
  // Get the user's data
  const { data, isLoading: loading } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const data = await authClient.getSession();

      return data;
    },
  });

  const user = data?.data?.user;

  return (
    <article className="w-full flex justify-between md:px-12 items-center bg-white p-4 border-b border-blue-200">
      <h2 className="text-2xl font-semibold text-primary hidden md:block">Bookly</h2>

      {/* User avatar and name */}
      <div className="flex items-center gap-2">
        {loading ? (
          <Skeleton className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-slate-200" />
        ) : (
          <Avatar className="w-8 h-8 md:w-12 md:h-12 rounded-full">
            <AvatarFallback>
              {user?.email.charAt(0).toUpperCase()}
            </AvatarFallback>
            <AvatarImage
              alt={`${user?.email}'s profile picture`}
              src={user?.image || ""}
            />
          </Avatar>
        )}

        {/* User details */}
        {loading ? (
          <article className="flex flex-col gap-2 items-cente">
            <Skeleton className="w-40 h-4 bg-slate-200" />
            <Skeleton className="w-32 h-4 bg-slate-200" />
          </article>
        ) : (
          <article className="flex flex-col items-cente">
            <h3 className="text-semibold text-xl">{user?.name || user?.email}</h3>
            {user?.email && <p className="text-slate-500 text-md">{user?.email}</p>}
          </article>
        )}
      </div>
    </article>
  );
}

export default Topbar;
