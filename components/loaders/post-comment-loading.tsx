import { Skeleton } from "@/components/ui/skeleton";

const PostCommentLoading = () => {
  return (
   <>
     <div className="flex mb-4 items-start justify-between gap-2">
      <div className="flex gap-x-2">
        <Skeleton className="h-8 w-8 rounded-full" />

        <div className="flex flex-col gap-y-px">
          <Skeleton className="w-24 h-4 rounded-none" />
          <Skeleton className="w-72 h-4 mt-1 rounded-none" />

          <Skeleton className="h-4 w-16 mt-1 rounded-none" />
        </div>
      </div>

      <Skeleton className="h-[14px] w-[14px] rounded-full" />
    </div>

    <div className="flex mb-4 items-start justify-between gap-2">
      <div className="flex gap-x-2">
        <Skeleton className="h-8 w-8 rounded-full" />

        <div className="flex flex-col gap-y-px">
          <Skeleton className="w-24 h-4 rounded-none" />
          <Skeleton className="w-72 h-4 mt-1 rounded-none" />

          <Skeleton className="h-4 w-16 mt-1 rounded-none" />
        </div>
      </div>

      <Skeleton className="h-[14px] w-[14px] rounded-full" />
    </div>

    <div className="flex mb-4 items-start justify-between gap-2">
      <div className="flex gap-x-2">
        <Skeleton className="h-8 w-8 rounded-full" />

        <div className="flex flex-col gap-y-px">
          <Skeleton className="w-24 h-4 rounded-none" />
          <Skeleton className="w-72 h-4 mt-1 rounded-none" />

          <Skeleton className="h-4 w-16 mt-1 rounded-none" />
        </div>
      </div>

      <Skeleton className="h-[14px] w-[14px] rounded-full" />
    </div>

    <div className="flex mb-4 items-start justify-between gap-2">
      <div className="flex gap-x-2">
        <Skeleton className="h-8 w-8 rounded-full" />

        <div className="flex flex-col gap-y-px">
          <Skeleton className="w-24 h-4 rounded-none" />
          <Skeleton className="w-72 h-4 mt-1 rounded-none" />

          <Skeleton className="h-4 w-16 mt-1 rounded-none" />
        </div>
      </div>

      <Skeleton className="h-[14px] w-[14px] rounded-full" />
    </div>

    <div className="flex mb-4 items-start justify-between gap-2">
      <div className="flex gap-x-2">
        <Skeleton className="h-8 w-8 rounded-full" />

        <div className="flex flex-col gap-y-px">
          <Skeleton className="w-24 h-4 rounded-none" />
          <Skeleton className="w-72 h-4 mt-1 rounded-none" />

          <Skeleton className="h-4 w-16 mt-1 rounded-none" />
        </div>
      </div>

      <Skeleton className="h-[14px] w-[14px] rounded-full" />
    </div>
   </>
  );
};
export default PostCommentLoading;
