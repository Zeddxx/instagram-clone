'use client';

import PostForm from "@/components/shared/post-form";
import { useState } from "react";

const CreatePost = () => {
  const [count, setCount] = useState<number>(1)

  return (
    <section className="relative">
    <div className="h-auto w-full">
        <PostForm setCount={setCount} count={count} action="Create" />
    </div>

    <footer className="fixed bottom-0 z-20 wrapper h-10 flex bg-white dark:bg-neutral-900 items-center justify-center">
        <span className="rounded-full bg-black dark:bg-gray-100/60 w-[65%] h-2"></span>
    </footer>
    </section>
  )
}
export default CreatePost