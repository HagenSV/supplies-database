'use client'

import ItemApi from "@/api/item-api";
import EditItemDialog from "@/components/item/EditItemDialog";
import { Item } from "@/data/item";
import { DeleteForever, Edit } from "@mui/icons-material";
import { Box, Button, Divider, IconButton, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function ItemsTable(){

    const [ dialogOpen, setDialogOpen ] = useState(false)
    const [ items, setItems ] = useState<Item[]>([]);
    const [ selectedItem, setSelectedItem ] = useState<Item | undefined>()

    useEffect( () => {
        loadItems();
    }, [])

    const loadItems = async () => {
        const items = await ItemApi.getItems();
        setItems(items);
    }

    const createItem = () => {
        setDialogOpen(true);
    }

    const editItem = (c: Item) => {
        setSelectedItem(c);
        setDialogOpen(true);
    }

    const deleteItem = (c: Item) => {
        ItemApi.delete(c.item_id);
    }

    const handleClose = () => {
        setSelectedItem(undefined);
        setDialogOpen(false);
    }
    
    return <Box>
        <Typography variant="h1">Items</Typography>
        <Button variant="contained" onClick={createItem}>Create</Button>
        <Stack direction="column" divider={<Divider orientation="horizontal" flexItem/>}>
            { items.map( item => 
                <Stack 
                    key={item.item_id} 
                    direction="row" 
                    sx={{ justifyContent: "space-between", alignItems: "center" }}
                >
                    <Typography>{ item.item_name }</Typography>
                    <Stack direction={"row"}>
                    <IconButton onClick={() => editItem(item)}>
                        <Edit />
                    </IconButton>
                    <IconButton onClick={() => deleteItem(item)}>
                        <DeleteForever />
                    </IconButton>
                    </Stack>
                </Stack>
            )}
        </Stack>

        <EditItemDialog 
            item={selectedItem}
            open={dialogOpen}
            onClose={handleClose}
        />
    </Box>
}