import { Models } from "appwrite";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { MoreHorizontalIcon } from "lucide-react";
import Image from "next/image";
import PostStats from "./post-stats";
import {
  useGetCurrentUser,
  usePostComment,
} from "@/lib/react-query/queries-mutation";
import { useEffect, useState } from "react";
import { Drawer, DrawerTrigger } from "../ui/drawer";
import Comments from "./comments";

type PostProps = {
  post: Models.Document;
};

const Posts = ({ post }: PostProps) => {
  const { data: user, isLoading: isUserLoading } = useGetCurrentUser();
  const [comment, setComment] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);

  const { mutateAsync: postComment, isPending: isPostPending } =
    usePostComment();

  const handleCommentPost = async (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      await postComment({
        postId: post.$id,
        comment,
        userId: user?.$id!,
      });
      setComment("");
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <li className="w-full h-full flex flex-col">
      {/* Posts banner */}
      <div className="h-[54px] w-full px-2 flex border-b items-center justify-between">
        <div className="flex gap-x-[10px] items-center">
          <Avatar className="h-8 w-8">
            <AvatarImage src={post.creator.imageUrl} />
            <AvatarFallback>PA</AvatarFallback>
          </Avatar>

          <div className="flex flex-col text-[13px] leading-none gap-px">
            <h6 className="font-semibold">{post.creator.username}</h6>
            <p className="text-xs">{post.location}</p>
          </div>
        </div>

        <div className="cursor-pointer">
          <MoreHorizontalIcon />
        </div>
      </div>

      <div className="h-auto w-full relative border-b">
        <Image src={post.imageUrl} alt="post image" width={375} height={375} className="object-cover max-h-[375px] min-h-[375px]" />
      </div>

      <PostStats post={post} userId={user?.$id!} />

      <div className="flex items-center gap-2 px-2">
        <div className="h-4 w-4 rounded-full bg-black"></div>
        <p className="text-sm">
          Liked by{" "}
          <span className="font-semibold">{post.likes.length} others</span>
        </p>
      </div>

      <div className="px-2 mt-1">
        <p className="text-sm">
          <span className="font-semibold">{post.creator.username}</span>{" "}
          {post.caption}
        </p>
      </div>

      <div className="px-2">
          <Drawer
            onOpenChange={() => setIsOpen(!isOpen)}
            modal={false}
            shouldScaleBackground={true}
          >
            <DrawerTrigger className="text-stone-500 text-sm">
              {post.comments.length > 0 ? `View all ${post.comments.length} comments` : "View comment"}
            </DrawerTrigger>
            {isOpen && (
              <Comments
              user={user!}
              comment={comment}
              handleComment={handleCommentPost}
              postId={post.$id}
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
    </li>
  );
};
export default Posts;
