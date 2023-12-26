import { Models } from "appwrite"
import Image from "next/image"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import Link from "next/link"
import { useGetCurrentUser } from "@/lib/react-query/queries-mutation"

type SearchedUserProps = {
    users: Models.Document | undefined
}

const SearchedUser = ({ users } : SearchedUserProps ) => {
  const { data: loggedUser } = useGetCurrentUser()
  const currentUser = users?.$id === loggedUser?.$id;

  if(!users) return <p>Loading...</p>

  return (
        <Link href={currentUser ? "/profile" : `/profile/${users.$id}`} className="flex cursor-pointer mb-1.5 items-center gap-x-2 border rounded-sm px-2 w-full py-2">
            <Avatar>
                <AvatarImage src={users.imageUrl} />
                <AvatarFallback>UI</AvatarFallback>
            </Avatar>

            <div className="text-sm leading-tight">
                <p>{users.username}</p>
                <p className="text-stone-400">{users.name}</p>
            </div>
        </Link>
  )
}
export default SearchedUser