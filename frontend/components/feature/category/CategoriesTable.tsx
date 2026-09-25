'use client'

import EditCategoryDialog from "@/components/feature/category/EditCategoryDialog";
import { useCategoryStore } from "@/context/category-store-provider";
import { Category } from "@/data/category";
import { DeleteForever, Edit } from "@mui/icons-material";
import { Box, Button, Divider, IconButton, Stack, Typography } from "@mui/material";
import { useState } from "react";

export default function CategoriesTable(){

    const [ dialogOpen, setDialogOpen ] = useState(false)
    const [ selectedCategory, setSelectedCategory ] = useState<Category | undefined>()
    const categoryStore = useCategoryStore();

    const createCategory = () => {
        setDialogOpen(true);
    }

    const editCategory = (c: Category) => {
        setSelectedCategory(c);
        setDialogOpen(true);
    }

    const deleteCategory = (c: Category) => {
        categoryStore.deleteCategory(c.category_id);
    }

    const handleClose = () => {
        setSelectedCategory(undefined);
        setDialogOpen(false);
    }
    
    return <Box>
        <Typography variant="h1">Manage Categories</Typography>
        <Button variant="contained" onClick={createCategory}>Create</Button>
        <Stack direction="column" divider={<Divider orientation="horizontal" flexItem/>}>
            { categoryStore.getCategories().map( category => 
                <Stack 
                    key={category.category_id} 
                    direction="row" 
                    sx={{ justifyContent: "space-between", alignItems: "center" }}
                >
                    <Typography>{ category.category_name }</Typography>
                    <Stack direction={"row"}>
                    <IconButton onClick={() => editCategory(category)}>
                        <Edit />
                    </IconButton>
                    <IconButton onClick={() => deleteCategory(category)}>
                        <DeleteForever />
                    </IconButton>
                    </Stack>
                </Stack>
            )}
        </Stack>

        <EditCategoryDialog 
            category={selectedCategory}
            open={dialogOpen}
            onClose={handleClose}
        />
    </Box>
}