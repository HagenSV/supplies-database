import { Box, Grid } from "@mui/material";
import Sidebar from "./Sidebar";
import ClientOnly from "@/components/ClientOnly";

interface Props {
    children: React.ReactNode
}

export default function LayoutContainer({ children }: Props){
    return <Box sx={{ height: "100vh", maxHeight: "100vh", overflow: "hidden" }}>
        <Grid container sx={{ height: "100%" }}>

            <Grid size={2}><Sidebar /></Grid>
            <Grid size={10} sx={{ padding: 3, maxHeight: "100%", overflowY: "auto" }}>
                <ClientOnly>
                {children}
                </ClientOnly>
            </Grid>
        </Grid>
    </Box>
}