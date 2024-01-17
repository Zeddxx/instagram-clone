import Image from "next/image"
import { Skeleton } from "../ui/skeleton"

const SpecificPostLoading = () => {
  return (
    <section>
      <header className="h-[44px] py-2 w-full">
        <nav className="flex px-4 items-center h-full w-full">
          <button className="">
            <img src="/assets/back.svg" width={10} height={18} alt="back" />
          </button>

          <h2 className="font-bold ml-4 text-lg">Posts</h2>
        </nav>

        <div className="flex gap-x-[10px] items-center px-2 py-2 mt-4">
          <Skeleton className="h-8 w-8 rounded-full" />

          <div className="flex flex-col text-[13px] leading-none gap-px">
            <Skeleton className="w-24 h-4 rounded-none" />
            <Skeleton className="w-14 h-3 rounded-none mt-px" />
          </div>
        </div>

        <Skeleton className="w-full h-[375px] rounded-none" />

        <div className="flex items-center px-2 mt-2 gap-x-3 justify-between">
          <div className="flex gap-x-3">
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-8 w-8" />
          </div>

          <div className="">
          <Skeleton className="h-8 w-8" />
          </div>
        </div>

        <div className="flex px-2 mt-2">
          <Skeleton className="w-16 h-4 rounded-none"/>
          <Skeleton className="flex-1 rounded-none ml-3" />
        </div>

        <div className="flex px-2 mt-2">
        <Skeleton className="w-full h-4 flex-1 rounded-none" />
        </div>
      </header>
    </section>
  )
}
export default SpecificPostLoading