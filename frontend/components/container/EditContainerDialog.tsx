"use client";

import ContainerApi from "@/api/container-api";
import LocationApi from "@/api/location-api";
import { Container } from "@/data/container";
import { Location } from "@/data/location";
import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useEffect, useState } from "react";

interface Props {
    container?: Container
    open: boolean
    onClose: () => void
}


export default function EditContainerDialog({ container, open, onClose }: Props) {

    const [ locations, setLocations ] = useState<Location[]>([])
    const [ location, setLocation ] = useState<Location | null>(null)


    useEffect( () => {
        LocationApi.getLocations().then( c => setLocations(c))
    }, [])

    useEffect( () => {

        if (!container?.location_id){
            setLocation(null);
            return;
        }
        
        LocationApi.getLocation(container?.location_id).then( c => setLocation(c))

    }, [container])

    const createContainer = async () => {
        await ContainerApi.createContainer({
            location_id: location?.location_id!
        });

        onClose();
    }

    const saveContainer = async () => {
        await ContainerApi.updateContainer({
            ...container!,
            location_id: location?.location_id!
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
        <DialogTitle>{ container ? "Edit" : "Create" } Container</DialogTitle>

        <DialogContent>
            <Autocomplete
                options={locations}
                value={location}
                onChange={(event, newValue) => setLocation(newValue)}
                getOptionLabel={o => o.location_name}
                getOptionKey={o => o.location_id}
                renderInput={(params) => <TextField {...params} label="Location"/>}
            />

        </DialogContent>
        <DialogActions>
            <Button variant="outlined" onClick={onClose}>Cancel</Button>
            { container &&
                <Button variant="contained" onClick={saveContainer} disabled={!location}>Save</Button>
            }
            { !container &&
                <Button variant="contained" onClick={createContainer} disabled={!location}>Create</Button>
            }
        </DialogActions>
    </Dialog>
}