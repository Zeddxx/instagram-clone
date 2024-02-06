import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useSettings } from "@/hooks/use-settings";
import { ModeToggle } from "./mode-toggle";

const ThemeSetting = () => {
    const settings = useSettings()
  return (
    <Dialog modal={false} open={settings.isOpen} onOpenChange={settings.onClose}>
      <DialogContent className="max-w-[335px] rounded-xl text-center">
        <DialogHeader className="text-center">
          <DialogTitle className="text-center">Change Application Theme.</DialogTitle>
          <DialogDescription className="text-center">
            You can change application theme by default it is set to system theme.
          </DialogDescription>
        </DialogHeader>

        <ModeToggle />
      </DialogContent>
    </Dialog>
  );
};
export default ThemeSetting;
