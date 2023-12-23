"use client";

import FollowingStories from "@/components/shared/following-stories";
import HomeNavbar from "@/components/shared/home-navbar";
import Loader from "@/components/shared/loader";
import Posts from "@/components/shared/posts";
import { useGetRecentPosts } from "@/lib/react-query/queries-mutation";
import { Models } from "appwrite";
import { useRouter } from "next/navigation";

const Home = () => {
  const {
    data: posts,
    isLoading: isPostLoading,
    isError: isErrorPosts,
  } = useGetRecentPosts();

  const router = useRouter()

  return (
    <section className="h-full relative w-full">
      <header className="fixed top-0 wrapper z-20 flex flex-col justify-end bg-gray-50 dark:bg-neutral-900 h-[5.5rem] border-b">
        <HomeNavbar />
      </header>
      <FollowingStories />
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
