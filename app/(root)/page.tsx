'use client';

import { redirect } from "next/navigation";


export default function Home() {
  if(true){
    return redirect("/home")
  }
  return (
    <main>
    </main>
  )
}
