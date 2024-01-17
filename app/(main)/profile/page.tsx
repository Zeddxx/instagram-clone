"use client";

import { Button } from "@/components/ui/button";
import { useGetCurrentUser, useSignOutAccount } from "@/lib/react-query/queries-mutation";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { IoExit } from "react-icons/io5";
import UserProfile from "@/components/shared/user-profile";
import UserProfileLoading from "@/components/loaders/user-profile-loading";
import { toast } from "sonner";

const ProfilePage = () => {
  const { data: user, isLoading: isUserLoading, isFetching } = useGetCurrentUser();
  const { mutate: signOut, isSuccess } = useSignOutAccount()

  const router = useRouter()

  useEffect(() => {
    if(isSuccess){
      toast.success("User signed out successfully! 😞🥺")
        return router.push("/sign-in")
    }
  },[isSuccess])

  if(isUserLoading && isFetching) {
    return <UserProfileLoading />
  }

  return (
    <section>
      <header className="h-[88px] w-full flex flex-col justify-end px-4">
        <nav className="h-[calc(100%/2)] w-full flex items-center justify-between">
          <div className="">
            <Button onClick={() => signOut()} size="icon" variant="outline">
              <IoExit size={24} />
            </Button>
          </div>

          <h1 className="font-bold tracking-normal">{user?.username}</h1>

          <button>
            <img
              src="/assets/bar.svg"
              alt="top-bar"
              className="dark:invert"
              width={20.5}
              height={17.5}
            />
          </button>
        </nav>
      </header>

      <UserProfile user={user!} type="CurrentUser" />
    </section>
  );
};
export default ProfilePage;
