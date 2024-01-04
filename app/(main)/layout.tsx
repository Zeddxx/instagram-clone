import Footer from "@/components/shared/footer";
import React from "react";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
      <section className="w-full overflow-hidden h-auto">
        {children}
        <Footer />
      </section>
  );
};
export default HomeLayout;
