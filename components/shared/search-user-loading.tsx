import { Skeleton } from "../ui/skeleton"

const SearchUserLoading = () => {
  return (
    <div className="w-full">
        {Array.from({ length: 6 }, (_, index) => (
            <div key={index} className="flex w-full rounded-none py-2 gap-x-3 justify-start">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="">
                <Skeleton className="h-4 w-36 mt-2" />
                <Skeleton className="h-4 w-24 mt-1" />
            </div>
        </div>
        ))}
    </div>
  )
}
export default SearchUserLoading