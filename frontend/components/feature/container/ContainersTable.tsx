'use client'

import ContainerApi from "@/api/container-api";
import EditContainerDialog from "@/components/feature/container/EditContainerDialog";
import { useContainerStore } from "@/context/container-store-provider";
import { useLocationStore } from "@/context/location-store-provider";
import { Container } from "@/data/container";
import { DeleteForever, Edit } from "@mui/icons-material";
import { Box, Button, Divider, IconButton, Stack, Typography } from "@mui/material";
import { useState } from "react";

export default function ContainersTable(){

    const [ dialogOpen, setDialogOpen ] = useState(false)
    const [ selectedContainer, setSelectedContainer ] = useState<Container | undefined>()
    const containerStore = useContainerStore();
    const locationStore = useLocationStore();

    const createContainer = () => {
        setDialogOpen(true);
    }

    const editContainer = (c: Container) => {
        setSelectedContainer(c);
        setDialogOpen(true);
    }

    const deleteContainer = (c: Container) => {
        ContainerApi.deleteContainer(c.container_id);
    }

    const handleClose = () => {
        setSelectedContainer(undefined);
        setDialogOpen(false);
    }
    
    return <Box>
        <Typography variant="h1">Manage Containers</Typography>
        <Button variant="contained" onClick={createContainer}>Create</Button>
        <Stack direction="column" divider={<Divider orientation="horizontal" flexItem/>}>
            { containerStore.getContainers().map( container => 
                <Stack 
                    key={container.container_id} 
                    direction="row" 
                    sx={{ justifyContent: "space-between", alignItems: "center" }}
                >
                    <Typography>Box { container.container_id }, { locationStore.getLocation(container.location_id)?.location_name }</Typography>
                    <Stack direction={"row"}>
                    <IconButton onClick={() => editContainer(container)}>
                        <Edit />
                    </IconButton>
                    <IconButton onClick={() => deleteContainer(container)}>
                        <DeleteForever />
                    </IconButton>
                    </Stack>
                </Stack>
            )}
        </Stack>

        <EditContainerDialog 
            container={selectedContainer}
            open={dialogOpen}
            onClose={handleClose}
        />
    </Box>
}