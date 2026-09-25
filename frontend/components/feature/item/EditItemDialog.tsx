"use client";

import { useCategoryStore } from "@/context/category-store-provider";
import { useItemStore } from "@/context/item-store-provider";
import { Category } from "@/data/category";
import { Item } from "@/data/item";
import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";

interface Props {
    item?: Item
    open: boolean
    onClose: () => void
}


export default function EditItemDialog({ item, open, onClose }: Props) {

    const [ itemName, setItemName ] = useState(item?.item_name ?? "")
    const [ category, setCategory ] = useState<Category | null>(null)

    const categoryStore = useCategoryStore();
    const itemStore = useItemStore();

    useEffect( () => {

        setItemName(item?.item_name ?? "")

        if (!item?.category_id){
            setCategory(null);
            return;
        }
        
        categoryStore.getCategory(item?.category_id).then( c => setCategory(c))

    }, [item])

    const createItem = async () => {
        await itemStore.create({
            item_name: itemName,
            category_id: category?.category_id
        });

        onClose();
    }

    const saveItem = async () => {
        await itemStore.update({
            ...item!,
            item_name: itemName,
            category_id: category?.category_id
        })

        onClose();
    }

    return <Dialog 
            open={open} 
            onClose={onClose} 
            fullWidth={true}
            maxWidth={"xs"}
            sx={{ padding: 6, borderRadius: 6 }}
        >
        <DialogTitle>{ item ? "Edit" : "Create" } Item</DialogTitle>

        <DialogContent>
            <Stack direction="column" spacing={2} sx={{ paddingTop: 1 }}>
                <TextField 
                    label="Item Name"
                    value={itemName}
                    fullWidth={true}
                    onChange={(event) => setItemName(event.target.value)}
                    sx={{ marginTop: 1 }}
                />
                <Autocomplete
                    options={categoryStore.getCategories()}
                    value={category}
                    onChange={(event, newValue) => setCategory(newValue)}
                    getOptionLabel={o => o.category_name}
                    getOptionKey={o => o.category_id}
                    renderInput={(params) => <TextField {...params} label="Category (Optional)"/>}
                />
            </Stack>
        </DialogContent>
        <DialogActions>
            <Button variant="outlined" onClick={onClose}>Cancel</Button>
            { item ?
                <Button variant="contained" onClick={saveItem}>Save</Button>
            :
                <Button variant="contained" onClick={createItem}>Create</Button>
            }
        </DialogActions>
    </Dialog>
}