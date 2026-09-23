'use client';

import ContainerApi from "@/api/container-api";
import ItemApi from "@/api/item-api";
import StoredItemApi from "@/api/stored-item-api";
import { Container } from "@/data/container";
import { Item } from "@/data/item";
import { Autocomplete, Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function AddItem(){

    const [items, setItems] = useState<Item[]>([])
    const [containers, setContainers] = useState<Container[]>([])

    const [selectedItem, setSelectedItem] = useState<Item | null>(null);
    const [selectedContainer, setSelectedContainer] = useState<Container | null>(null);
    const [quantity, setQuantity] = useState(1);

    useEffect( () => {
        fetchData();
    }, [])

    const fetchData = async () => {
        const items = await ItemApi.getItems();
        setItems(items);

        const containers = await ContainerApi.getContainers();
        setContainers(containers);
    }

    const saveItem = async () => {
        if (!selectedItem || !selectedContainer || quantity < 1){
            return;
        }

        const res = await StoredItemApi.createStoredItem({
            item_id: selectedItem.item_id,
            container_id: selectedContainer.container_id,
            quantity: quantity
        })

        if (!res.ok){
            console.error(await res.text())
            return;
        }

        setTimeout( () => window.location.href = "/", 500)
    }

    return <Box>
        <Typography variant="h1">Add Item</Typography>

        <Stack direction="column" spacing={2}>
            <Autocomplete 
                options={items}
                value={selectedItem}
                onChange={(event, newValue) => setSelectedItem(newValue)}
                getOptionLabel={o => o.item_name}
                getOptionKey={o => o.item_id}
                renderInput={(params) => <TextField {...params} label="Item"/>}
            />

            <Autocomplete 
                options={containers}
                value={selectedContainer}
                onChange={(event, newValue) => setSelectedContainer(newValue)}
                getOptionLabel={o => `Box ${o.container_id}, ${o.location?.location_name ?? o.location_id}`}
                getOptionKey={o => o.container_id}
                renderInput={(params) => <TextField {...params} label="Container"/>}
            />

            <TextField 
                label="Quantity"
                value={quantity}
                onChange={e => setQuantity(parseInt(e.target.value))}
            />

            <Button variant="contained" onClick={saveItem}>
                Add To Storage                
            </Button>
        </Stack>

    </Box>
}