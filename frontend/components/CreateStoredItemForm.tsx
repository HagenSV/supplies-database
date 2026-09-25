import StoredItemApi from "@/api/stored-item-api";
import { useContainerStore } from "@/context/container-store-provider";
import { useItemStore } from "@/context/item-store-provider";
import { Container } from "@/data/container";
import { Item } from "@/data/item";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useState } from "react";

export default function CreateStoredItemForm(){
    const itemStore = useItemStore()
    const containerStore = useContainerStore()

    const [selectedItem, setSelectedItem] = useState<Item | null>(null);
    const [selectedContainer, setSelectedContainer] = useState<Container | null>(null);
    const [quantity, setQuantity] = useState(1);

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
                options={itemStore.getAll()}
                value={selectedItem}
                onChange={(event, newValue) => setSelectedItem(newValue)}
                getOptionLabel={o => o.item_name}
                getOptionKey={o => o.item_id}
                renderInput={(params) => <TextField {...params} label="Item"/>}
            />

            <Autocomplete 
                options={containerStore.getContainers()}
                value={selectedContainer}
                onChange={(event, newValue) => setSelectedContainer(newValue)}
                getOptionLabel={o => `Box ${o.container_id}, ${o.location_id}`}
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