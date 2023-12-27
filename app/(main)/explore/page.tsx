'use client'

import { useGetRecentPosts } from "@/lib/react-query/queries-mutation"
import ExploreNavbar from "./_components/explore-navbar"
import ExplorePosts from "./_components/explore-posts"
import ExploreLoading from "@/components/loaders/explore-loading"

const ExplorePage = () => {
  const { data: posts, isLoading: isPostLoading, isFetching } = useGetRecentPosts()

  if(!posts && isPostLoading && isFetching) {
    return(
      <section>
      <header className="sticky top-0 z-20">
        <ExploreNavbar />
      </header>

      <ExploreLoading />
    </section>
    )
  }

  return (
    <section>
      <header className="sticky top-0 z-20">
        <ExploreNavbar />
      </header>

      <ul className="w-full grid-flow-row grid grid-cols-3 h-full">
        {posts?.documents.map((post) => (
          <ExplorePosts key={post.$id} post={post} />
        ))}
      </ul>
    </section>
  )
}
export default ExplorePage