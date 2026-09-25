"use client";

import { useLocationStore } from "@/context/location-store-provider";
import { Location } from "@/data/location";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useEffect, useState } from "react";

interface Props {
    location?: Location
    open: boolean
    onClose: () => void
}


export default function EditLocationDialog({ location, open, onClose }: Props) {

    const [ locationName, setLocationName ] = useState(location?.location_name ?? "")
    const locationStore = useLocationStore();

    useEffect( () => {
        setLocationName(location?.location_name ?? "")
    }, [location])

    const createLocation = async () => {
        await locationStore.createLocation({
            location_name: locationName
        });

        onClose();
    }

    const saveLocation = async () => {
        await locationStore.updateLocation({
            ...location!,
            location_name: locationName
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
        <DialogTitle>{ location ? "Edit" : "Create" } Location</DialogTitle>

        <DialogContent>
            <TextField 
                label="Location Name"
                value={locationName}
                fullWidth={true}
                onChange={(event) => setLocationName(event.target.value)}
                sx={{ marginTop: 1 }}
            />

        </DialogContent>
        <DialogActions>
            <Button variant="outlined" onClick={onClose}>Cancel</Button>
            { location &&
                <Button variant="contained" onClick={saveLocation}>Save</Button>
            }
            { !location &&
                <Button variant="contained" onClick={createLocation}>Create</Button>
            }
        </DialogActions>
    </Dialog>
}