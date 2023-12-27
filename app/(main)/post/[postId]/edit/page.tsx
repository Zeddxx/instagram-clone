'use client';

import PostForm from "@/components/shared/post-form";
import { useGetPostById } from "@/lib/react-query/queries-mutation";
import { useState } from "react";

const EditPost = ({ params } : { params : { postId: string }}) => {
  const [count, setCount] = useState<number>(1)
  const {
    data: post,
    isLoading: isPostLoading,
    isFetching,
  } = useGetPostById(params.postId || "");
  console.log(post);

  if(!post && isPostLoading && isFetching) {
    return <div className="">loading</div>
  }
  
  return (
    <section>
        <PostForm count={count} setCount={setCount} action="Update" post={post}  />
    </section>
  )
}
export default EditPost