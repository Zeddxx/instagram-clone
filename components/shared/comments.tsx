"use client";

import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "../ui/drawer";
import { useGetCurrentPostComments } from "@/lib/react-query/queries-mutation";
import { Models } from "appwrite";
import { Dispatch, SetStateAction } from "react";
import PostCommentLoading from "../loaders/post-comment-loading";

type CommentsProps = {
  postId: string;
  isPostPending: boolean;
  user: Models.Document;
  comment: string;
  handleComment: (e: React.KeyboardEvent) => Promise<void>;
  setComment: Dispatch<SetStateAction<string>>;
};

const Comments = ({
  postId,
  isPostPending,
  user,
  comment,
  handleComment,
  setComment,
}: CommentsProps) => {
  const { data: comments, isLoading: isCommentLoading } =
    useGetCurrentPostComments(postId);

  return (
    <DrawerContent className="max-w-[375px] min-h-[470px] max-h-[430px] h-full mx-auto z-20">
      <div className="absolute -z-10 -top-[740px] h-[740px] w-full bg-black/60"></div>
      <DrawerHeader>
        <DrawerTitle className="text-center text-sm border-b pb-3">
          Comments
        </DrawerTitle>
      </DrawerHeader>

      {isCommentLoading ? (
        <div className="px-2 w-full h-full">
            <PostCommentLoading />
        </div>
      ) : (
        <>
          <div className="mt-4 w-full h-auto overflow-y-scroll textarea-scroll-hide z-20 px-4 flex flex-col gap-y-4">
            {isPostPending && (
              <div className="flex items-start justify-between gap-2">
                <div className="flex gap-x-2">
                  <Avatar className="h-8 w-8 cursor-pointer">
                    <AvatarImage src={user.imageUrl} />
                    <AvatarFallback>CA</AvatarFallback>
                  </Avatar>

                  <div className="flex flex-col gap-y-px">
                    <p className="text-xs font-semibold">
                      {user.username}{" "}
                      <span className="text-stone-400 ml-2">1d</span>
                    </p>
                    <p className="text-sm font-normal">{comment}</p>

                    <p className="text-stone-400 text-xs font-semibold">
                      Reply
                    </p>
                  </div>
                </div>

                <div className="cursor-pointer">
                  <Image
                    src="/assets/like.svg"
                    className="dark:invert"
                    alt="like"
                    height={14}
                    width={14}
                  />
                </div>
              </div>
            )}
            {comments?.documents.map((comment: Models.Document) => (
              <div
                key={comment.$id}
                className="flex items-start justify-between gap-2"
              >
                <div className="flex gap-x-2">
                  <Avatar className="h-8 w-8 cursor-pointer">
                    <AvatarImage src={comment.user.imageUrl} />
                    <AvatarFallback>CA</AvatarFallback>
                  </Avatar>

                  <div className="flex flex-col gap-y-px">
                    <p className="text-xs font-semibold">
                      {comment.user.username}{" "}
                      <span className="text-stone-400 ml-2">1d</span>
                    </p>
                    <p className="text-sm font-normal">{comment.comment}</p>

                    <p className="text-stone-400 text-xs font-semibold">
                      Reply
                    </p>
                  </div>
                </div>

                <div className="cursor-pointer">
                  <Image
                    src="/assets/like.svg"
                    className="dark:invert"
                    alt="like"
                    height={14}
                    width={14}
                  />
                </div>
              </div>
            ))}
          </div>

          <DrawerFooter className="flex justify-between">
            <div className="flex gap-x-1">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user.imageUrl} />
                <AvatarFallback>PA</AvatarFallback>
              </Avatar>

              <input
                value={comment}
                onKeyUp={handleComment}
                onChange={(e) => setComment(e.target.value)}
                type="text"
                className="flex-1 text-sm bg-transparent border-b placeholder:text-sm pl-1 placeholder:text-stone-500 focus:ring-0 focus:outline-none"
                placeholder="Add a comment..."
              />
            </div>
          </DrawerFooter>
        </>
      )}
    </DrawerContent>
  );
};
export default Comments;
