"use client";

import SpecificPostLoading from "@/components/loaders/specific-post-loading";
import Comments from "@/components/shared/comments";
import MoreOption from "@/components/shared/more-option";
import PostStats from "@/components/shared/post-stats";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Drawer, DrawerTrigger } from "@/components/ui/drawer";
import {
  useGetCurrentUser,
  useGetPostById,
  usePostComment,
} from "@/lib/react-query/queries-mutation";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SpecificPost = ({ params }: { params: { postId: string } }) => {
  const {
    data: post,
    isLoading: isPostLoading,
    isFetching,
  } = useGetPostById(params.postId || "");

  const { data: user } = useGetCurrentUser();
  const [isOpen, setIsOpen] = useState(false);
  const [comment, setComment] = useState<string>("");

  const { mutateAsync: postComment, isPending: isPostPending } =
    usePostComment();

  const router = useRouter();

  const handleCommentPost = async (e: React.KeyboardEvent) => {
    e.stopPropagation();

    if (e.key === "Enter") {
      try {
        await postComment({
          postId: post?.$id!,
          comment,
          userId: user?.$id!,
        });

        setComment("");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const usersPost = user?.$id === post?.creator.$id;

  if (isPostLoading && isFetching) {
    return <SpecificPostLoading />;
  }

  return (
    <section className="pb-16">
      <header className="h-[44px] py-2 w-full">
        <nav className="flex px-4 items-center h-full w-full">
          <button className="" onClick={() => router.back()}>
            <img
            loading="lazy"
              src="/assets/back.svg"
              className="dark:invert"
              width={9}
              height={18}
              alt="back"
            />
          </button>

          <h2 className="font-bold ml-4 text-xl">Posts</h2>
        </nav>
      </header>

      <div className="">
        <div className="flex gap-x-[10px] items-center justify-between px-2 py-2">
          <div className="flex gap-x-[10px]">
            <Link
              href={usersPost ? "/profile" : `/profile/${post?.creator.$id}`}
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src={post?.creator.imageUrl} />
                <AvatarFallback>PA</AvatarFallback>
              </Avatar>
            </Link>

            <div className="flex flex-col text-[13px] leading-none gap-px">
              <Link
                href={usersPost ? "/profile" : `/profile/${post?.creator.$id}`}
              >
                <h6 className="font-semibold">{post?.creator.username}</h6>
              </Link>
              <p className="text-xs">{post?.location}</p>
            </div>
          </div>

          <MoreOption imageId={post?.imageId} postId={params.postId} user={usersPost} />
        </div>

        <div className="w-full h-[375px] relative">
          <img
            src={post?.imageUrl}
            alt="post image"
            width={375}
            height={375}
            className="object-cover aspect-square object-center"
          />
        </div>

        <PostStats post={post!} userId={user?.$id!} />

        <div className="flex items-center gap-2 px-2">
          <div className="h-4 w-4 rounded-full bg-black"></div>
          <p className="text-sm">
            Liked by{" "}
            <span className="font-semibold">{post?.likes.length} others</span>
          </p>
        </div>

        <div className="px-2 mt-1">
          <p className="text-sm">
            <span className="font-semibold">{post?.creator.username}</span>{" "}
            {post?.caption}
          </p>

          <div className="flex gap-x-1">
            {post?.tags.map((tag: string, index: number) => (
              <p key={index} className="text-sm text-blue-500">
                {tag}
              </p>
            ))}
          </div>
        </div>

        <div className="px-2">
          <Drawer
            onOpenChange={() => setIsOpen(!isOpen)}
            modal={false}
            shouldScaleBackground={true}
          >
            <DrawerTrigger className="text-stone-500 text-sm">
              {post?.comments.length > 0
                ? `View all ${post?.comments.length} comments`
                : "View comment"}
            </DrawerTrigger>
            {isOpen && (
              <Comments
                user={user!}
                comment={comment}
                handleComment={handleCommentPost}
                postId={post?.$id!}
                setComment={setComment}
                isPostPending={isPostPending}
              />
            )}
          </Drawer>
        </div>

        <div className="flex w-full py-3 relative gap-x-1.5 items-center px-2">
          <Avatar className="w-7 h-7">
            <AvatarImage src={user?.imageUrl} />
            <AvatarFallback>CU</AvatarFallback>
          </Avatar>
          {/* <input type="text" className="border-b w-full bg-transparent px-2 focus:ring-0 focus:outline-none py-2" /> */}
          <input
            value={comment}
            placeholder="Add a comment..."
            onChange={(e) => setComment(e.target.value)}
            onKeyUp={handleCommentPost}
            className="bg-transparent focus:ring-0 focus:outline-0 w-full placeholder:text-sm placeholder:text-stone-400 px-2 py-1 placeholder:pt-[2px]"
          />
        </div>
      </div>
    </section>
  );
};
export default SpecificPost;
