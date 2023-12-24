"use client";

import UserLoading from "@/components/loaders/user-loading";
import FollowingStories from "@/components/shared/following-stories";
import HomeNavbar from "@/components/shared/home-navbar";
import Loader from "@/components/shared/loader";
import Posts from "@/components/shared/posts";
import { useUserContext } from "@/context/auth-context";
import { useGetRecentPosts } from "@/lib/react-query/queries-mutation";
import { Models } from "appwrite";

const Home = () => {
  const {
    data: posts,
    isLoading: isPostLoading,
    isError: isErrorPosts,
  } = useGetRecentPosts();

  const { user, isLoading: isUserLoading } = useUserContext()

  if(isUserLoading) {
    return <UserLoading />
  }

  return (
    <section className="h-full relative w-full">
      <header className="fixed top-0 wrapper z-20 flex flex-col justify-end bg-gray-50 dark:bg-neutral-900 h-[5.5rem] border-b">
        <HomeNavbar />
      </header>
      <FollowingStories user={user!} />
      {/* Followings Posts */}

      {isPostLoading && !posts ? (
        <Loader />
      ) : (
        <ul className="w-full h-full flex flex-col pb-20">
          {posts?.documents.map((post: Models.Document) => (
            <Posts key={post.$id} post={post} />
          ))}
        </ul>
      )}
    </section>
  );
};
export default Home;
