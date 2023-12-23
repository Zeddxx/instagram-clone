import { useUserContext } from "@/context/auth-context"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { useGetCurrentUser } from "@/lib/react-query/queries-mutation";
import { redirect } from "next/navigation";

const FollowingStories = () => {
  const { data: user } = useGetCurrentUser();

  if(!user){
    return redirect("/sign-in")
  }
  
  return (
    <div className="h-[6.125rem] w-full flex gap-x-5 px-2 mt-[5.5rem] items-center overflow-hidden border-b">
        <Avatar className="h-[3.875rem] w-[3.875rem] rounded-full border-2 shrink-0">
          <AvatarImage src={user?.imageUrl} />
          <AvatarFallback>UI</AvatarFallback>
        </Avatar>
        {/* <div className="h-[3.875rem] w-[3.875rem] rounded-full border-2 shrink-0"></div>
        <div className="h-[3.875rem] w-[3.875rem] rounded-full border-2 shrink-0"></div>
        <div className="h-[3.875rem] w-[3.875rem] rounded-full border-2 shrink-0"></div>
        <div className="h-[3.875rem] w-[3.875rem] rounded-full border-2 shrink-0"></div> */}
    </div>
  )
}
export default FollowingStories