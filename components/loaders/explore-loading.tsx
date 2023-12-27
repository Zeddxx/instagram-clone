import { Skeleton } from "../ui/skeleton"

const ExploreLoading = () => {
  return (
    <div className="w-full grid-flow-row grid grid-cols-3 h-full">
        {Array.from({length: 12 }, (_, index) => (
            <Skeleton key={index} className="sm:w-[124px] aspect-square sm:h-[124px] shrink scale-95 sm:scale-[.98] rounded-none" />
        ))}
    </div>
  )
}
export default ExploreLoading