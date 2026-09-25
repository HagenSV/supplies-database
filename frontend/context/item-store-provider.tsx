'use client';

import ItemApi from "@/api/item-api";
import { ItemStore } from "@/store/item-store";
import { createContext, useContext, useState, useSyncExternalStore } from "react";

const ItemStoreContext = createContext<ItemStore | null>(null)

export default function ItemStoreProvider({ children }: { children: React.ReactNode }){
    const [ store ] = useState(new ItemStore(new ItemApi()));
    return <ItemStoreContext value={store} >{ children }</ItemStoreContext>
}

export function useItemStore(){
    const store = useContext(ItemStoreContext)

    if (!store) {
        throw new Error("useItemStore must be used within a ItemStoreProvider")
    }

    const snapshot = useSyncExternalStore(store.subscribe, () => store)

    return snapshot;
}