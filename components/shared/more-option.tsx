import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { Edit, MoreHorizontalIcon } from "lucide-react"
import Link from "next/link"
import DeleteAlert from "./delete-alert"
  

const MoreOption = ({ user, postId } : { user: boolean, postId: string }) => {
  return (
    <DropdownMenu modal={false}>
  <DropdownMenuTrigger>
    <MoreHorizontalIcon />    
  </DropdownMenuTrigger>
  <DropdownMenuContent align="end">
    {user ? (
        <>
        <DropdownMenuItem asChild>
            <Link href={`/post/${postId}/edit`} className="flex py-2 mb-1 justify-between items-center">
                Edit <Edit size={18} />
            </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="flex justify-between items-center">
            <DeleteAlert />
        </DropdownMenuItem>
        </>
    ) : null}
  </DropdownMenuContent>
</DropdownMenu>

  )
}
export default MoreOption