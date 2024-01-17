"use client";

import ProfileUploader from "@/components/shared/profile-uploader";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import {
  useGetCurrentUser,
  useUpdateUser,
} from "@/lib/react-query/queries-mutation";
import { UpdateProfileValidation } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const EditProfile = () => {
  const {
    data: currentUser,
    isLoading: isCurrentUserLoading,
    isFetching,
  } = useGetCurrentUser();

  const { mutateAsync: updateUser, isPending: isLoadingUpdate } =
    useUpdateUser();

  const router = useRouter();

  const form = useForm<z.infer<typeof UpdateProfileValidation>>({
    resolver: zodResolver(UpdateProfileValidation),
    defaultValues: {
      bio: currentUser?.bio || "",
      file: [],
      name: currentUser?.name,
      username: currentUser?.username,
    },
  });

  if (!currentUser && isCurrentUserLoading && isFetching) {
    return <p>Loading...</p>;
  }

  async function onSubmit(values: z.infer<typeof UpdateProfileValidation>) {
    toast.loading("Updating user profile...🫷")
    try {
      const updatedUser = await updateUser({
        userId: currentUser?.$id,
        name: values.name,
        username: values.username,
        bio: values.bio,
        file: values.file,
        imageUrl: currentUser?.imageUser,
        imageId: currentUser?.imageId,
      });

      toast.success("Profile updated successfully! ❤️");
      router.push("/profile");
    } catch (error) {
      console.log(error);
      toast.error("Update profile failed! 🥲");
    }
  }

  return (
    <section className="w-full">
      <nav className="px-2 py-4 flex items-center justify-between bg-gray-50 dark:bg-neutral-900">
        <button className="font-semibold" onClick={() => router.back()}>Cancel</button>

        <h1 className="text-sm font-semibold">Edit profile</h1>

        <button
          disabled={isLoadingUpdate}
          onClick={form.handleSubmit(onSubmit)}
          className="text-blue-500 font-semibold"
        >
          Done
        </button>
      </nav>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-3 w-full px-4"
        >
          <FormField
            control={form.control}
            name="file"
            render={({ field }) => (
              <FormItem>
                <FormControl className="flex justify-center items-center">
                  <div className="flex flex-col">
                    <ProfileUploader
                      fieldChange={field.onChange}
                      mediaUrl={currentUser?.imageUrl}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl className="flex-1">
                  <div className="flex gap-x-4 items-center">
                    <Label htmlFor="name" className="mr-8 text-md font-normal">
                      Name
                    </Label>
                    <input
                      className="w-full bg-transparent focus:outline-none border-b h-[44px] rounded-none placeholder:text-sm placeholder:text-stone-400"
                      placeholder="Name"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex gap-x-4 items-center">
                    <Label htmlFor="username" className="text-md font-normal">
                      Username
                    </Label>
                    <input
                      className="w-full h-[44px] rounded-none focus:outline-none border-b bg-transparent placeholder:text-sm"
                      placeholder="Username"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex gap-x-4 items-center">
                    <Label
                      htmlFor="bio"
                      className="mr-[50px] text-md font-normal"
                    >
                      Bio
                    </Label>
                    <input
                      className="w-full h-[44px] rounded-none focus:outline-none border-b bg-transparent placeholder:text-sm"
                      placeholder="Bio"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-col justify-center items-center h-[320px]">
            <span className="text-6xl">💀</span>
            <p className="text-stone-500 mt-3">what do you expect!</p>
          </div>
        </form>
      </Form>
    </section>
  );
};
export default EditProfile;
