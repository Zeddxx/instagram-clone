import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useSettings } from "@/hooks/use-settings";
import { ModeToggle } from "./mode-toggle";

const ThemeSetting = () => {
    const settings = useSettings()
  return (
    <Dialog modal={false} open={settings.isOpen} onOpenChange={settings.onClose}>
      <DialogContent className="max-w-[335px] rounded-xl">
        <DialogHeader>
          <DialogTitle>Are you sure absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>

        <ModeToggle />
      </DialogContent>
    </Dialog>
  );
};
export default ThemeSetting;
