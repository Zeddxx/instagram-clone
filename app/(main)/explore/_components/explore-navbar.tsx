"use client";

import SearchedUser from "@/components/shared/searched-user";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FilterTap } from "@/constants";
import useDebounce from "@/hooks/use-debounce";
import { useGetSearchUser } from "@/lib/react-query/queries-mutation";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";

const ExploreNavbar = () => {
  const [isSearchQuery, setIsSearchQuery] = useState<string>("");

  const debouncedValue = useDebounce(isSearchQuery, 500);
  const {
    data: searchedUsers,
    isLoading: isUserLoading,
    isFetching: isUserSearching,
  } = useGetSearchUser(debouncedValue);

  return (
    <nav className="h-[132px] w-full bg-white dark:bg-neutral-900 py-2 flex flex-col justify-end px-2">
      <div className="flex gap-x-3 relative w-full items-center">
        <div className="relative w-full flex-1">
          <Input
            type="text"
            value={isSearchQuery}
            onChange={(e) => setIsSearchQuery(e.target.value)}
            placeholder="Search"
            className={cn(
              "bg-gray-100 dark:bg-neutral-800 peer rounded-xl placeholder:font-normal h-9 pl-9 border-none",
              !!isSearchQuery && "flex-1 max-w-full shrink-0"
            )}
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

        {isSearchQuery && (
          <div className="max-w-[375px] inset-x-0 px-2 py-2 min-h-[calc(100vh-180px)] absolute top-10 shadow rounded-bl-sm rounded-br-sm border dark:bg-black">
            {isUserLoading && isUserSearching ? (
              <div className="h-full w-full flex items-center justify-center">
                loading...
              </div>
            ) : (
              searchedUsers?.documents.map((users) => (
                <SearchedUser key={users.$id} users={users} />
              ))
            )}
          </div>
        )}

        <div
          className={cn(
            "opacity-100 duration-150",
            !!isSearchQuery && "opacity-0 scale-0 hidden"
          )}
        >
          <Image
            src="/assets/live.svg"
            className="dark:invert"
            alt="Live"
            width={20}
            height={20}
          />
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
