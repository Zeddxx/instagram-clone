import Image from "next/image";
import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {

  return (
    <main className="w-full h-screen">
      <section className="w-full flex flex-col justify-center items-center h-full px-4">
      <div className="">
            <Image
            src="/assets/logo.svg"
            alt="Instagram Logo"
            width={182}
            className="dark:invert"
            height={49}
            />
          </div>
        {children}
      </section>
    </main>
  );
};
export default AuthLayout;
