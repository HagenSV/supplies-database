'use client'

import EditLocationDialog from "@/components/feature/location/EditLocationDialog";
import { useLocationStore } from "@/context/location-store-provider";
import { Location } from "@/data/location";
import { DeleteForever, Edit } from "@mui/icons-material";
import { Box, Button, Divider, IconButton, Stack, Typography } from "@mui/material";
import { useState } from "react";

export default function LocationsTable(){

    const [ dialogOpen, setDialogOpen ] = useState(false)
    const [ selectedLocation, setSelectedLocation ] = useState<Location | undefined>()
    const locationStore = useLocationStore();

    const createLocation = () => {
        setDialogOpen(true);
    }

    const editLocation = (c: Location) => {
        setSelectedLocation(c);
        setDialogOpen(true);
    }

    const deleteLocation = (c: Location) => {
        locationStore.deleteLocation(c.location_id);
    }

    const handleClose = () => {
        setSelectedLocation(undefined);
        setDialogOpen(false);
    }
    
    return <Box>
        <Typography variant="h1">Manage Locations</Typography>
        <Button variant="contained" onClick={createLocation}>Create</Button>
        <Stack direction="column" divider={<Divider orientation="horizontal" flexItem/>}>
            { locationStore.getLocations().map( location => 
                <Stack 
                    key={location.location_id} 
                    direction="row" 
                    sx={{ justifyContent: "space-between", alignItems: "center" }}
                >
                    <Typography>{ location.location_name }</Typography>
                    <Stack direction={"row"}>
                    <IconButton onClick={() => editLocation(location)}>
                        <Edit />
                    </IconButton>
                    <IconButton onClick={() => deleteLocation(location)}>
                        <DeleteForever />
                    </IconButton>
                    </Stack>
                </Stack>
            )}
        </Stack>

        <EditLocationDialog 
            location={selectedLocation}
            open={dialogOpen}
            onClose={handleClose}
        />
    </Box>
}