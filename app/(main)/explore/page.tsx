import ExploreNavbar from "./_components/explore-navbar"
import ExplorePosts from "./_components/explore-posts"

const ExplorePage = () => {
  return (
    <section>
      <header className="sticky top-0">
        <ExploreNavbar />
      </header>

      <ul className="w-full grid-flow-row grid grid-cols-3 h-auto">
        <ExplorePosts />
      </ul>
    </section>
  )
}
export default ExplorePage