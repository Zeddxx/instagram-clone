import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FilterTap } from "@/constants";
import Image from "next/image";

const ExploreNavbar = () => {
  return (
    <nav className="h-[132px] w-full bg-white dark:bg-neutral-900 py-2 flex flex-col justify-end px-2">
      <div className="flex gap-x-3 w-full items-center">
        <div className="relative w-full">
          <Input
            type="text"
            placeholder="Search"
            className="bg-gray-100 dark:bg-neutral-800 rounded-xl placeholder:font-normal h-9 pl-9 border-none"
          />
          <span className="absolute left-2.5 top-1/2 -translate-y-1/2">
            <Image
              src="/assets/search.svg"
              alt="search"
              className="opacity-50 dark:invert"
              width={18}
              height={18}
            />
          </span>
        </div>

        <div className="">
          <Image src="/assets/live.svg" className="dark:invert" alt="Live" width={20} height={20} />
        </div>
      </div>

      <div className="flex items-center gap-x-2 w-full mt-2 overflow-x-scroll textarea-scroll-hide">
        {FilterTap.map((tap) => (
          <Button
            key={tap.name}
            variant="outline"
            size="sm"
            className="h-9 font-medium"
          >
            {tap.name}
          </Button>
        ))}
      </div>
    </nav>
  );
};
export default ExploreNavbar;
