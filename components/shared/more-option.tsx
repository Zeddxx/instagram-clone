'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit, MoreHorizontalIcon } from "lucide-react";
import Link from "next/link";
import DeleteAlert from "./delete-alert";
import { useDeletePost } from "@/lib/react-query/queries-mutation";
import { toast } from "sonner";

const MoreOption = ({
  user,
  postId,
  imageId,
}: {
  user: boolean;
  postId: string;
  imageId?: string;
}) => {
  const { mutate: deletePost } = useDeletePost();
  
  const handleDelete = () => {
    toast.loading("Deleting post... 🫷");

    try {
      deletePost({postId: postId,imageId: imageId! });
      toast.success("Post deleted successfully")
    } catch (error) {
      console.log(error);
      toast.error("Error deleting the post 😔");
    }
  };
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger>
        <MoreHorizontalIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {user ? (
          <>
            <DropdownMenuItem asChild>
              <Link
                href={`/post/${postId}/edit`}
                className="flex py-2 mb-1 justify-between items-center"
              >
                Edit <Edit size={18} />
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              asChild
              className="flex justify-between items-center"
            >
              <DeleteAlert handleDelete={handleDelete} />
            </DropdownMenuItem>
          </>
        ) : null}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default MoreOption;
