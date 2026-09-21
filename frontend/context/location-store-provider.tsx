'use client';

import { LocationStore } from "@/store/location-store";
import { createContext, useContext, useState } from "react";

const LocationStoreContext = createContext<LocationStore | null>(null)


export default function LocationStoreProvider({ children }: { children: React.ReactNode }){

    const [ store ] = useState(new LocationStore());
    return <LocationStoreContext value={store} >{ children }</LocationStoreContext>

}

export function useLocationStore(){
    const store = useContext(LocationStoreContext)

    if (!store) {
        throw new Error("useLocationStore must be used within a LocationStoreProvider")
    }

    return store;
}