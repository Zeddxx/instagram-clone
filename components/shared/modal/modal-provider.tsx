"use client";

import { useEffect, useState } from "react";
import ThemeSetting from "../theme-setting";

export const ModalProvider = () => {
    const [ isMounted, setIsMounted ] = useState<boolean>(false)

    useEffect(() => {
        setIsMounted(true)
    },[])

    if(!isMounted) return null;

    return (
        <>
            <ThemeSetting />
        </>
    )
}