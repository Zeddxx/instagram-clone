"use client";

import { PostValidation } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Models } from "appwrite";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import AutoResizeInput from "./auto-resize-input";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useUserContext } from "@/context/auth-context";
import { Input } from "../ui/input";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import FileUploader from "./file-uploader";
import { useCreatePost } from "@/lib/react-query/queries-mutation";

type PostFormTypes = {
  post?: Models.Document;
  count?: number;
  setCount: Dispatch<SetStateAction<number>>;
  action: "Create" | "Update";
};

const PostForm = ({ count, post, action, setCount }: PostFormTypes) => {
  const { user } = useUserContext();
  const { mutateAsync: createPost, isPending: isLoadingCreate } = useCreatePost()

  const router = useRouter();

  const [currentFile, setCurrentFile] = useState<string>("");

  const handleCancel = () => {
    return router.back();
  };

  const form = useForm<z.infer<typeof PostValidation>>({
    resolver: zodResolver(PostValidation),
    defaultValues: {
      caption: post ? post?.caption : "",
      location: post ? post?.location : "",
      tags: post ? post?.tags.join(" ") : "",
      file: [],
    },
  });

  async function onSubmit(values: z.infer<typeof PostValidation>) {
    const newPost = await createPost({
      ...values,
      userId: user.id,
    })

    if(!newPost) {
      return;
    }

    router.push("/home")
  }
  return (
    <>
      <header className="sticky top-0 inset-0 bg-white dark:bg-neutral-900 z-20">
        <nav className="flex flex-col justify-end w-full h-[88px]">
          <div className="flex items-center w-full justify-between px-4">
            {count === 1 ? (
              <>
                <button onClick={handleCancel} className="py-2 font-medium">
                  Cancel
                </button>
                <button
                  onClick={() => setCount(2)}
                  disabled={!form.getValues().file[0]}
                  className="py-2 font-medium text-blue-500"
                >
                  Next
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setCount(1)}
                  className="py-2 font-medium"
                >
                  Back
                </button>
                <button
                  onClick={form.handleSubmit(onSubmit)}
                  className="py-2 font-medium text-blue-500"
                >
                  Create
                </button>
              </>
            )}
          </div>
        </nav>
      </header>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col w-full h-full"
        >
          {count === 1 ? (
            <>
              <FormField
                control={form.control}
                name="file"
                render={({ field }) => (
                  <FormItem className="space-y-0">
                    <FormControl>
                      <>
                        <div className="h-[375px] w-full">
                          <FileUploader
                            fieldChange={field.onChange}
                            setCurrentFile={setCurrentFile}
                            mediaUrl={post?.imageUrl}
                          />
                        </div>

                        <div className="w-full h-[191px] grid grid-cols-3 overflow-y-scroll photos-gallery">
                          <div className="bg-black h-[125px] w-full"></div>
                          <div className="bg-black h-[125px] w-full"></div>
                          <div className="bg-black h-[125px] w-full"></div>
                          <div className="bg-black h-[125px] w-full"></div>
                          <div className="bg-black h-[125px] w-full"></div>
                          <div className="bg-black h-[125px] w-full"></div>
                        </div>
                      </>
                    </FormControl>
                  </FormItem>
                )}
              />
            </>
          ) : (
            <div className="flex flex-col h-full w-full">
              <FormField
                control={form.control}
                name="caption"
                render={({ field }) => (
                  <FormItem className="py-2 border-b px-4">
                    <FormControl>
                      <div className="flex items-center gap-x-2 justify-between">
                        <Avatar>
                          <AvatarImage src={user.imageUrl} />
                          <AvatarFallback>UI</AvatarFallback>
                        </Avatar>
                        <AutoResizeInput
                          placeholder="Write a caption..."
                          maxLength={2000}
                          className="placeholder:text-sm placeholder:pt-0.5 bg-transparent"
                          {...field}
                        />
                        {currentFile && (
                          <Image
                            src={currentFile}
                            alt="upload image"
                            className="aspect-square h-14 w-14 mt-1.5 cursor-pointer"
                            onClick={() => setCount(1)}
                            width={24}
                            height={24}
                          />
                        )}
                      </div>
                    </FormControl>
                    <FormMessage className="shad-form_message" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem className="py-1 border-b px-4">
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Add location"
                        {...field}
                        className="rounded-none border-none py-0 px-0"
                      />
                    </FormControl>
                    <FormMessage className="shad-form_message" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem className="py-2 px-4 border-b">
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Tags (seperated by space )"
                        {...field}
                        className="rounded-none border-none py-0 px-0 text-blue-600"
                      />
                    </FormControl>
                    <FormMessage className="shad-form_message" />
                  </FormItem>
                )}
              />
              <div className="h-[382px] min-h-full w-full flex flex-col items-center justify-center gap-4">
                <Image
                  src="/assets/camera.svg"
                  alt="Camera"
                  className="opacity-25 dark:invert"
                  width={200}
                  height={200}
                />
                <p className="text-muted-foreground text-sm">
                  I didn't added more functionnality to this.
                </p>
              </div>
            </div>
          )}
        </form>
      </Form>
    </>
  );
};
export default PostForm;
