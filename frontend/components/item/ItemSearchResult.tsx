"use client";

import StoredItemApi from "@/api/stored-item-api";
import { Item } from "@/data/item";
import { StoredItem } from "@/data/stored_item";
import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";
import { Box, Divider, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import StoredItemResult from "../StoredItemResult";
import { useCategoryStore } from "@/context/category-store-provider";
import { Category } from "@/data/category";

interface Props {
    item: Item
}

enum LoadState {
    NOT_STARTED,
    LOADING,
    FINISHED
}

export default function ItemSearchResult({ item }: Props) {

    const CategoryStore = useCategoryStore();

    const [ loading, setLoading ] = useState(LoadState.NOT_STARTED);
    const [ children, setChildren ] = useState<StoredItem[]>([]);
    const [ open, setOpen ] = useState(false);
    const [ category, setCategory ] = useState<Category | null>(null)

    useEffect( () => {
        getCategory();
    }, [])

    const getCategory = async () => {
        const category = await CategoryStore.getCategory(item.category_id ?? 0);
        setCategory(category)
    }

    const loadItems = async () => {
        const items = await StoredItemApi.getStoredItemByItem(item.item_id);
        setChildren(items);
        setLoading(LoadState.FINISHED);
    }

    const onClick = () => {
        setOpen(o => !o);
        if (loading == LoadState.NOT_STARTED){
            loadItems();
            setLoading(LoadState.LOADING);
        }
    }


    return <Box className="p-3">
        <Box onClick={onClick}>
            <Stack direction="row" sx={{ justifyContent: "space-between"}}>
                <Box>
                    <Typography variant="body1" className="font-bold">{ item.item_name }</Typography>
                    <Typography>Category: { category?.category_name ?? "Uncategorized" }</Typography>
                  </Box>
                { open && <ArrowDropUp fontSize="large" /> }
                { !open && <ArrowDropDown fontSize="large" /> }
            </Stack>
        </Box>
        <Stack
            direction="column"
            divider={<Divider orientation="horizontal" flexItem/>} 
            className={`${open ? "block" : "hidden"} pt-5 px-5`}
        >
            { loading == LoadState.LOADING &&
                <Typography variant="body2">Loading...</Typography>
            }
            { loading == LoadState.FINISHED && 
                children.map( stored => <StoredItemResult key={stored.stored_item_id} storedItem={stored}/>)
            }
        </Stack>
    </Box>
}