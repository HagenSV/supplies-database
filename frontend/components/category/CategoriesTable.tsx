'use client'

import CategoryApi from "@/api/category-api";
import EditCategoryDialog from "@/components/category/EditCategoryDialog";
import { Category } from "@/data/category";
import { DeleteForever, Edit } from "@mui/icons-material";
import { Box, Button, Divider, IconButton, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function CategoriesTable(){

    const [ dialogOpen, setDialogOpen ] = useState(false)
    const [ categories, setCategories ] = useState<Category[]>([]);
    const [ selectedCategory, setSelectedCategory ] = useState<Category | undefined>()

    useEffect( () => {
        loadCategories();
    }, [])

    const loadCategories = async () => {
        const categories = await CategoryApi.getCategories();
        setCategories(categories);
    }

    const createCategory = () => {
        setDialogOpen(true);
    }

    const editCategory = (c: Category) => {
        setSelectedCategory(c);
        setDialogOpen(true);
    }

    const deleteCategory = (c: Category) => {
        CategoryApi.deleteCategory(c.category_id);
    }

    const handleClose = () => {
        setSelectedCategory(undefined);
        setDialogOpen(false);
    }
    
    return <Box>
        <Typography variant="h1">Categories</Typography>
        <Button variant="contained" onClick={createCategory}>Create</Button>
        <Stack direction="column" divider={<Divider orientation="horizontal" flexItem/>}>
            { categories.map( category => 
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