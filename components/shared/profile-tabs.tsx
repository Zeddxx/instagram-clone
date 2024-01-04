import ExplorePosts from "@/app/(main)/explore/_components/explore-posts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Models } from "appwrite";
import Image from "next/image";

type ProfileTabsProps = {
    posts: Models.Document[]
    saved: Models.Document[]
}

const ProfileTabs = ({ posts, saved } : ProfileTabsProps) => {
  return (
    <Tabs defaultValue="posts" className="w-[400px]">
      <TabsList className={cn("max-w-[375px] w-full py-0 border-b")}>
        <TabsTrigger value="posts" className="w-full rounded-none h-full">
          <Image
            src="/assets/grid.svg"
            alt="posts"
            className="dark:invert"
            width={18}
            height={18}
          />
        </TabsTrigger>
        <TabsTrigger value="saved" className="w-full rounded-none h-full">
          <Image
            src="/assets/tag.svg"
            className="dark:invert"
            alt="tag"
            width={18}
            height={18}
          />
        </TabsTrigger>
      </TabsList>
      <TabsContent value="posts">
      {posts.length > 0 ? (
        <ul className="w-full mb-16 grid-flow-row grid grid-cols-3 h-full">
          {posts.map((post: Models.Document) => (
            <ExplorePosts key={post.$id} post={post} />
          ))}
        </ul>
      ) : (
        <div className="h-full w-full flex py-12 pb-24 items-center justify-center">
          <div className="">
            <Image
              src="/assets/camera.svg"
              alt="camera for no posts"
              width={180}
              height={180}
            />
            <p className="mt-4 text-stone-400">No posts from this user</p>
          </div>
        </div>
      )}
      </TabsContent>
      <TabsContent value="saved">
      {saved.length > 0 ? (
        <ul className="w-full mb-16 grid-flow-row grid grid-cols-3 h-full">
          {saved.map((post: Models.Document) => (
            <ExplorePosts key={post.$id} post={post.post} />
          ))}
        </ul>
      ) : (
        <div className="h-full w-full flex py-12 pb-24 items-center justify-center">
          <div className="">
            <Image
              src="/assets/camera.svg"
              alt="camera for no posts"
              width={180}
              height={180}
            />
            <p className="mt-4 text-stone-400">No saved posts yet!</p>
          </div>
        </div>
      )}
      </TabsContent>
    </Tabs>
  );
};
export default ProfileTabs;
