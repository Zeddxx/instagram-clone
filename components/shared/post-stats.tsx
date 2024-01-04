"use client";

import {
  useDeleteSavedPost,
  useGetCurrentUser,
  useLikePost,
  useSavePost,
} from "@/lib/react-query/queries-mutation";
import { checkIsLiked } from "@/lib/utils";
import { Models } from "appwrite";
import Image from "next/image";
import { useState, useEffect } from "react";

type PostStatsProps = {
  post: Models.Document;
  userId: string;
};

const PostStats = ({ post, userId }: PostStatsProps) => {
  const likesList = post.likes.map((user: Models.Document) => user.$id);

  const [likes, setLikes] = useState(likesList);
  const [isSaved, setIsSaved] = useState(false);

  const { mutateAsync: likePost, isPending, isSuccess } = useLikePost();
  const { mutateAsync: savePost } = useSavePost();
  const { mutateAsync: deleteSavedPost } = useDeleteSavedPost();

  const { data: currentUser } = useGetCurrentUser();

  const handleLikePost = (e: React.MouseEvent) => {
    e.stopPropagation();
    let newLikes = [...likes];

    const hasLiked = newLikes.includes(userId);
    if (hasLiked) {
      newLikes = newLikes.filter((id) => id !== userId);
    } else {
      newLikes.push(userId);
    }

    setLikes(newLikes);
    likePost({ postId: post.$id, likesArray: newLikes });
  };

  const savedPostRecord = currentUser?.save.find(
    (record: Models.Document) => record.post.$id === post?.$id
  );


  useEffect(() => {
    setIsSaved(!!savedPostRecord)
  }, [currentUser])

  const handleSavePost = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (savedPostRecord) {
      setIsSaved(false);
      return deleteSavedPost(savedPostRecord.$id);
    }
    savePost({ postId: post?.$id, userId: userId });
    setIsSaved(true);
  };

  return (
    <>
    <div className="flex items-center justify-between h-auto w-full px-2 py-3">
      <div className="h-max flex gap-[17.5px] items-center">
        <div className="cursor-pointer">
        {checkIsLiked(likes, userId)
        ? <Image
            src="/assets/liked.svg"
            alt="like"
            onClick={handleLikePost}
            width={24}
            height={21}
          />
          : <Image
          src="/assets/like.svg"
          alt="like"
          onClick={handleLikePost}
          className="dark:invert"
          width={24}
          height={21}
        />
        }
        </div>
        <div className="cursor-pointer">
          <Image
            src="/assets/comment.svg"
            alt="comment"
            className="dark:invert"
            onClick={() => {}}
            width={22}
            height={23}
          />
        </div>
        <div className="cursor-pointer">
          <Image
            src="/assets/messanger.svg"
            alt="messanger"
            className="dark:invert"
            width={24}
            height={24}
          />
        </div>
      </div>

      <div className="h-max w-fit cursor-pointer">
        <Image
          src={isSaved ? "/assets/saved.svg" : "/assets/save.svg"}
          alt="save"
          className="dark:invert"
          onClick={handleSavePost}
          width={21}
          height={24}
        />
      </div>
    </div>
    <div className="flex items-center gap-2 px-2">
    <p className="text-sm font-medium">
    {isPending ? (checkIsLiked(likes, userId) ? Math.max(1, likes.length) : likes.length + 1) : likes.length} Likes
    </p>
  </div>
  </>
  );
};
export default PostStats;
