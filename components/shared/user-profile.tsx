import { Models } from "appwrite"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Button } from "../ui/button"
import Image from "next/image"
import ExplorePosts from "@/app/(main)/explore/_components/explore-posts"
import Link from "next/link"

type UserProfileProps = {
    user: Models.Document
    type: "CurrentUser" | "SpecificUser"
}
const UserProfile = ({ user, type } : UserProfileProps) => {
  return (
    <>
        <div className="w-full h-auto px-4 mt-4 border-b">
        <div className="flex items-center justify-between gap-10">
            <Avatar className="h-[86px] w-[86px]">
                <AvatarImage src={user?.imageUrl} />
                <AvatarFallback>CU</AvatarFallback>
            </Avatar>

            <div className="flex flex-1 justify-between">
                <div className="text-center text-sm">
                    <p>{user?.posts.length}</p>
                    <h2>Posts</h2>
                </div>
                <div className="text-center text-sm">
                    <p>0</p>
                    <h2>Followers</h2>
                </div>
                <div className="text-center text-sm">
                    <p>0</p>
                    <h2>Following</h2>
                </div>
            </div>
        </div>

        <div className="w-full mt-4">
            <p>{user?.name}</p>
            <p className="text-stone-300 text-sm">{user?.bio}</p>
        </div>

        {type === 'CurrentUser'
        ? <Button asChild variant="outline" size="sm" className="w-full mt-4 font-semibold">
        <Link href={`/edit`}>
            Edit profile
        </Link>
    </Button>
    : (
        <Button variant="secondary" className="flex-1 w-full bg-blue-600 hover:bg-blue-700 mt-4" size="sm">
            Follow
        </Button>
    )}

        <div className="flex items-center w-full py-4">
            <div className="h-16 w-16 rounded-full border dark:border-stone-700 grid place-items-center">
                <Image src="/assets/add-story.svg" alt="add story" className="dark:invert dark:opacity-70" width={18} height={18} />
            </div>
        </div>
      </div>

      <div className="flex w-full">
        <Button variant="ghost" className="flex-1 rounded-none bg-gray-100 dark:bg-stone-800">
            <Image src="/assets/grid.svg" alt="posts" className="dark:invert" width={18} height={18} />
        </Button>
        <Button disabled variant="ghost" className="flex-1 rounded-none">
            <Image src="/assets/tag.svg" className="dark:invert" alt="tag" width={18} height={18} />
        </Button>
      </div>

      {user?.posts.length > 0 
      ? <ul className="w-full mb-16 grid-flow-row grid grid-cols-3 h-full">
      {user.posts.map((post: Models.Document) => (
        <ExplorePosts key={post.$id} post={post} />
      ))}
    </ul>
    : <div className="h-full w-full flex py-12 pb-24 items-center justify-center">
        <div className="">
            <Image src="/assets/camera.svg" alt="camera for no posts" width={180} height={180} />
        <p className="mt-4 text-stone-400">No posts from this user</p>
        </div>

    </div>
      }
    </>
  )
}
export default UserProfile