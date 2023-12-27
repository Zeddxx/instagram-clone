'use client';

import { MobileNavItems } from "@/constants"
import Image from "next/image"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useUserContext } from "@/context/auth-context";
import { cn } from "@/lib/utils";

const Footer = () => {
    const pathname = usePathname();
    const { user } = useUserContext()
  return (
    <footer className="fixed mx-auto bottom-0 inset-x-0 w-[375px] border bg-white dark:bg-neutral-900 h-16 flex items-center px-4">
        <div className="flex w-full h-fit">
            {MobileNavItems.map((item) => {
                const isActive = pathname === item.href;

                return(
                <div key={item.name} className="w-[calc(100%/5)] shrink-0 flex items-center justify-center dark:invert">
                    <Link href={item.href} className="w-fit">
                <Image
                src={isActive ? item.active : item.icon}
                alt={item.name}
                width={item.width}
                height={item.height}
                />
            </Link>
                </div>
            )})}
            <Link href="/profile" className="w-[calc(100%/5)] flex items-center justify-center">
                <Avatar className={cn("w-[22px] h-[22px] rounded-full shrink-0", pathname === "/profile" && "ring-1 ring-black dark:ring-gray-100 ring-offset-2")}>
                    <AvatarImage src={user.imageUrl} />
                    <AvatarFallback>AI</AvatarFallback>
                </Avatar>
            </Link>
        </div>
    </footer>
  )
}
export default Footer