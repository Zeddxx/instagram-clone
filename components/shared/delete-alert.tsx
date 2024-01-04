import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash } from "lucide-react";
import { buttonVariants } from "../ui/button";

type DeleteAlertProps = {
  handleDelete: () => void
}

const DeleteAlert = ({ handleDelete } : DeleteAlertProps ) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger className="flex w-full justify-between px-2 py-1.5 hover:bg-black/5 dark:hover:bg-white/10 rounded-sm">
        Delete <Trash size={18} />
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-[375px]">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            post and remove all post data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} className={buttonVariants({ variant: "destructive" })}>
                Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default DeleteAlert;
