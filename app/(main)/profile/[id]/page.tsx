'use client';

import UserProfileLoading from "@/components/loaders/user-profile-loading";
import UserProfile from "@/components/shared/user-profile";
import { useGetCurrentUser, useGetUserProfile } from "@/lib/react-query/queries-mutation";
import { ArrowLeft, MoreVerticalIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const Page = ({ params }: { params: { id: string } }) => {
  const { data: user, isLoading: isUserLoading, isFetching: isUserFetching } = useGetUserProfile(params.id)

  const router = useRouter()
  
  if(isUserFetching && isUserLoading){
    return (
        <UserProfileLoading />
    )
  }

  return (
    <section>
      <header className="py-2 w-full">
        <nav className="flex items-center p-2 w-full justify-between">
          <div className="flex gap-x-6 items-center">
            <button className="" onClick={() => router.back()}>
              <ArrowLeft size={28} />
            </button>

            <div className="">
                <h1 className="font-semibold">{user?.username}</h1>
            </div>
          </div>

          <div className="">
            <MoreVerticalIcon />
          </div>
        </nav>
      </header>

        <UserProfile type="SpecificUser" user={user!} />
    </section>
  );
};
export default Page;
