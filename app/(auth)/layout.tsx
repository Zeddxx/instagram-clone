'use client';

import { useGetCurrentUser } from "@/lib/react-query/queries-mutation";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const { data: user, isLoading: isUserLoading } = useGetCurrentUser()

  if(isUserLoading){
    return(
      <div className="wrapper flex items-center justify-center h-[100dvh]">
        <Image className="dark:invert" src="/assets/logo.svg" alt="logo" width={110} height={28} />
      </div>
    )
  }

  if(user){
    return redirect("/home")
  }

  return (
    <main className="w-full h-screen">
      <section className="w-full flex flex-col justify-center items-center h-full px-4">
      <div className="">
            <Image
            src="/assets/logo.svg"
            alt="Instagram Logo"
            width={182}
            height={49}
            />
          </div>
        {children}
      </section>
    </main>
  );
};
export default AuthLayout;
