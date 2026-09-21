'use client';

import { ContainerStore } from "@/store/container-store";
import { createContext, useContext, useState } from "react";

const ContainerStoreContext = createContext<ContainerStore | null>(null)


export default function ContainerStoreProvider({ children }: { children: React.ReactNode }){

    const [ store ] = useState(new ContainerStore());
    return <ContainerStoreContext value={store} >{ children }</ContainerStoreContext>

}

export function useContainerStore(){
    const store = useContext(ContainerStoreContext)

    if (!store) {
        throw new Error("useContainerStore must be used within a ContainerStoreProvider")
    }

    return store;
}