import { Box, Stack } from "@mui/material";
import { pages } from "./pages";
import SidebarCategory from "./SidebarCategory";

export default function Sidebar(){
    return <Box sx={{ 
        backgroundColor: "#D3FCCA", 
        height: "100%", 
        padding: 3, 
        borderTopRightRadius: 20, 
        borderBottomRightRadius: 20,
        color: "rgba(0,0,0,0.60)",
        fontSize: 12
    }}>
        <Stack spacing={2}>
            { pages.map( c => <SidebarCategory key={c.name} category={c} /> )}
        </Stack>
    </Box>
}