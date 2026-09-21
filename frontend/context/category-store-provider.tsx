'use client';

import { CategoryStore } from "@/store/category-store";
import { createContext, useContext, useState } from "react";

const CategoryStoreContext = createContext<CategoryStore | null>(null)

export default function CategoryStoreProvider({ children }: { children: React.ReactNode }){
    const [ store ] = useState(new CategoryStore());  
    return <CategoryStoreContext value={store} >{ children }</CategoryStoreContext>

}

export function useCategoryStore(){
    const store = useContext(CategoryStoreContext)

    if (!store) {
        throw new Error("useCategoryStore must be used within a CategoryStoreProvider")
    }

    return store;
}