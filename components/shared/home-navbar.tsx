'use client'

import { useSettings } from "@/hooks/use-settings";
import { SparkleIcon } from "lucide-react";

const HomeNavbar = () => {
  const settings = useSettings()

  return (
      <nav className="w-full h-1/2 flex justify-between dark:invert px-2 items-center">
        <img src="/assets/camera.svg" alt="Camera" width={24} height={24} className="opacity-40" />

        <img src="/assets/logo.svg" alt="logo" width={105} height={28} />

        {/* <Image src="assets/messanger.svg" alt="Messanger" width={24} height={24} /> */}
        <button onClick={settings.onOpen}>
          <SparkleIcon className="dark:invert cursor-pointer" />
        </button>
      </nav>
  );
};
export default HomeNavbar;
