'use client';

import { ArrowLeft, MoreVerticalIcon } from "lucide-react"
import { Skeleton } from "../ui/skeleton"
import { useRouter } from "next/navigation"

const UserProfileLoading = () => {
  const router = useRouter()

  return (
    <section>
         <header className="py-2 w-full">
        <nav className="flex items-center p-2 w-full justify-between">
          <div className="flex gap-x-6 items-center">
            <button className="" onClick={() => router.back()}>
              <ArrowLeft size={28} />
            </button>

            <Skeleton className="h-7 w-28" />
          </div>

          <div className="">
            <MoreVerticalIcon />
          </div>
        </nav>
      </header>

      <div className="flex items-center px-2 mt-3 justify-between">
      <Skeleton className="h-24 w-24 rounded-full" />

      <div className="flex gap-x-3 items-center justify-center">
        <div className="flex flex-col items-center">
            <Skeleton className="h-8 w-8" />
            <p className="text-sm mt-1">Posts</p>
        </div>
        <div className="flex flex-col items-center">
            <Skeleton className="h-8 w-8" />
            <p className="text-sm mt-1">Followers</p>
        </div>
        <div className="flex flex-col items-center">
            <Skeleton className="h-8 w-8" />
            <p className="text-sm mt-1">Following</p>
        </div>
      </div>
      </div>

      <div className="w-full mt-4 px-2">
            <Skeleton className="w-20 h-5" />
            <Skeleton className="w-full h-4 mt-2" />
            <Skeleton className="w-full h-4 mt-2" />
            <Skeleton className="w-1/2 h-4 mt-2" />
        </div>

        <div className="px-2 w-full mt-5">
            <Skeleton className="w-full h-9" />
        </div>

        <div className="px-2 w-full mt-5">
            <Skeleton className="w-full h-9" />
        </div>

        <div className="w-full grid-flow-row mt-5 grid grid-cols-3 h-full">
            <Skeleton className="sm:w-[124px] aspect-square sm:h-[124px] shrink scale-95 sm:scale-[.98]" />
            <Skeleton className="sm:w-[124px] aspect-square sm:h-[124px] shrink scale-95 sm:scale-[.98]" />
            <Skeleton className="sm:w-[124px] aspect-square sm:h-[124px] shrink scale-95 sm:scale-[.98]" />
            <Skeleton className="sm:w-[124px] aspect-square sm:h-[124px] shrink scale-95 sm:scale-[.98]" />
            <Skeleton className="sm:w-[124px] aspect-square sm:h-[124px] shrink scale-95 sm:scale-[.98]" />
            <Skeleton className="sm:w-[124px] aspect-square sm:h-[124px] shrink scale-95 sm:scale-[.98]" />
        </div>
    </section>
  )
}
export default UserProfileLoading