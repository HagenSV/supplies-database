"use client";

import { useCategoryStore } from "@/context/category-store-provider";
import { Category } from "@/data/category";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useEffect, useState } from "react";

interface Props {
    category?: Category
    open: boolean
    onClose: () => void
}


export default function EditCategoryDialog({ category, open, onClose }: Props) {

    const [ categoryName, setCategoryName ] = useState(category?.category_name ?? "")
    const categoryStore = useCategoryStore();

    useEffect( () => {
        setCategoryName(category?.category_name ?? "")
    }, [category])

    const createCategory = async () => {
        await categoryStore.createCategory({
            category_name: categoryName
        });

        onClose();
    }

    const saveCategory = async () => {
        await categoryStore.updateCategory({
            ...category!,
            category_name: categoryName
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
        <DialogTitle>{ category ? "Edit" : "Create" } Category</DialogTitle>

        <DialogContent>
            <TextField 
                label="Category Name"
                value={categoryName}
                fullWidth={true}
                onChange={(event) => setCategoryName(event.target.value)}
                sx={{ marginTop: 1 }}
            />

        </DialogContent>
        <DialogActions>
            <Button variant="outlined" onClick={onClose}>Cancel</Button>
            { category &&
                <Button variant="contained" onClick={saveCategory}>Save</Button>
            }
            { !category &&
                <Button variant="contained" onClick={createCategory}>Create</Button>
            }
        </DialogActions>
    </Dialog>
}