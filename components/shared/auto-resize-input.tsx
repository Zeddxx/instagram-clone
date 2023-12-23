'use client';

import * as React from "react"
import { useEffect } from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement>{}

const AutoResizeInput = React.forwardRef<HTMLTextAreaElement, InputProps>(
    ({ className, ...props }, ref) => {

    useEffect(() => {
        const textareaEl = document.querySelector(".textarea-input");

        textareaEl?.addEventListener("input", autoResize, false)

        return() => {
            textareaEl?.removeEventListener("input", autoResize, false)
        }

        function autoResize(this: HTMLInputElement){
            this.style.height = "auto"
            this.style.height = this.scrollHeight + "px"
        }
    })
  return (
    <textarea
    rows={1}
    {...props}
    className={cn("textarea-input resize-none w-full focus:ring-0 focus:outline-none rounded-none py-2 textarea-scroll-hide", className)}
    />
  )
})
export default AutoResizeInput