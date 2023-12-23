"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useGetCurrentUser, useSignOutAccount } from "@/lib/react-query/queries-mutation";
import Image from "next/image";
import ExplorePosts from "../explore/_components/explore-posts";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const ProfilePage = () => {
  const { data: user } = useGetCurrentUser();
  const { mutate: signOut, isSuccess } = useSignOutAccount()
  const router = useRouter()

  useEffect(() => {
    if(isSuccess){
        return router.push("/sign-in")
    }
  },[isSuccess])

  return (
    <section>
      <header className="h-[88px] w-full flex flex-col justify-end px-4">
        <nav className="h-[calc(100%/2)] w-full flex items-center justify-between">
          <div className="">
            <button onClick={() => signOut()}>
                sign out
            </button>
          </div>

          <h1 className="font-bold tracking-normal">{user?.username}</h1>

          <button>
            <Image
              src="/assets/bar.svg"
              alt="top-bar"
              width={20.5}
              height={17.5}
            />
          </button>
        </nav>
      </header>

      <div className="w-full h-auto px-4 mt-4 border-b">
        <div className="flex items-center justify-between gap-10">
            <Avatar className="h-[86px] w-[86px]">
                <AvatarImage src={user?.imageUrl} />
                <AvatarFallback>CU</AvatarFallback>
            </Avatar>

            <div className="flex flex-1 justify-between">
                <div className="text-center text-sm">
                    <p>0</p>
                    <h2>Posts</h2>
                </div>
                <div className="text-center text-sm">
                    <p>0</p>
                    <h2>Followers</h2>
                </div>
                <div className="text-center text-sm">
                    <p>0</p>
                    <h2>Following</h2>
                </div>
            </div>
        </div>

        <div className="w-full mt-4">
            <p>{user?.name}</p>
            <p>{user?.bio}</p>
        </div>

        <Button variant="outline" size="sm" className="w-full mt-4 font-semibold">
            Edit Profile
        </Button>

        <div className="flex items-center w-full py-4">
            <div className="h-16 w-16 rounded-full border grid place-items-center">
                <Image src="/assets/add-story.svg" alt="add story" width={18} height={18} />
            </div>
        </div>
      </div>

      <div className="flex w-full">
        <Button variant="ghost" className="flex-1 rounded-none bg-gray-100">
            <Image src="/assets/grid.svg" alt="posts" width={18} height={18} />
        </Button>
        <Button disabled variant="ghost" className="flex-1 rounded-none">
            <Image src="/assets/tag.svg" alt="tag" width={18} height={18} />
        </Button>
      </div>

      <ul className="w-full mb-16 grid-flow-row grid grid-cols-3 h-full">
        <ExplorePosts />
      </ul>
    </section>
  );
};
export default ProfilePage;
