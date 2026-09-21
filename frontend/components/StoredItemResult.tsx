import { useContainerStore } from "@/context/container-store-provider";
import { useLocationStore } from "@/context/location-store-provider";
import { Location } from "@/data/location";
import { StoredItem } from "@/data/stored_item";
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";

interface Props {
    storedItem: StoredItem
}

export default function StoredItemResult({ storedItem }: Props){

    const ContainerStore = useContainerStore();
    const LocationStore = useLocationStore();

    const [ location , setLocation ] = useState<Location | null>(null);

    useEffect( () => {
        getLocation();
    }, [])

    const getLocation = async () => {
        const container = await ContainerStore.getContainer(storedItem.container_id);

        if (!container) return;

        const location = await LocationStore.getLocation(container.location_id);

        setLocation(location);
    }


    return <Box>
        <Typography>Item</Typography>
        <Typography>Box: { storedItem.container_id }, Location: { location?.location_name ?? "Unknown" }</Typography>
        <Typography>Quantity: {storedItem.quantity}</Typography>
    </Box>
}