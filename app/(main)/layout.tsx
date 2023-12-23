import Footer from "@/components/shared/footer"
import React from "react"

const HomeLayout = ({
    children
} : {
    children: React.ReactNode
}) => {
  return (
    <section className="w-full h-auto">
        {children}
        <Footer />
    </section>
  )
}
export default HomeLayout