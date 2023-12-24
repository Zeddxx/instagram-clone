'use client'

import { useGetRecentPosts } from "@/lib/react-query/queries-mutation"
import ExploreNavbar from "./_components/explore-navbar"
import ExplorePosts from "./_components/explore-posts"

const ExplorePage = () => {
  const { data: posts, isLoading: isPostLoading, isFetching } = useGetRecentPosts()

  return (
    <section>
      <header className="sticky top-0 z-20">
        <ExploreNavbar />
      </header>

      <ul className="w-full grid-flow-row grid grid-cols-3 h-full min-h-[calc(100vh-135px)]">
        {posts?.documents.map((post) => (
          <ExplorePosts key={post.$id} post={post} />
        ))}
      </ul>
    </section>
  )
}
export default ExplorePage