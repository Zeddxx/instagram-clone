import HomeNavbar from "../shared/home-navbar"
import { Skeleton } from "../ui/skeleton"

const UserLoading = () => {
  return (
    <section className="w-full h-[calc(100vh-5.5rem)]">
      <header className="fixed top-0 wrapper z-20 flex flex-col justify-end bg-gray-50 dark:bg-neutral-900 h-[5.5rem] border-b">
        <HomeNavbar />
      </header>

      <div className="flex py-2 px-2 gap-x-3 mt-[5.5rem] overflow-x-scroll textarea-scroll-hide">
        <Skeleton className="h-[3.875rem] w-[3.875rem] shrink-0 rounded-full" />
        <Skeleton className="h-[3.875rem] w-[3.875rem] shrink-0 rounded-full" />
        <Skeleton className="h-[3.875rem] w-[3.875rem] shrink-0 rounded-full" />
        <Skeleton className="h-[3.875rem] w-[3.875rem] shrink-0 rounded-full" />
        <Skeleton className="h-[3.875rem] w-[3.875rem] shrink-0 rounded-full" />
        <Skeleton className="h-[3.875rem] w-[3.875rem] shrink-0 rounded-full" />
      </div>

      <div className="px-2">
      <Skeleton className="h-9 rounded-none w-full" />

      <Skeleton className="h-[375px] w-full rounded-none mt-2" />
      </div>
    </section>
  )
}
export default UserLoading