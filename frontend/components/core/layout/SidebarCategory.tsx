"use client";

import { Box, Stack, Typography } from "@mui/material";
import { PageCateory } from "./pages";
import SidebarLink from "./SidebarLink";
import { useState } from "react";
import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";

interface Props {
    category: PageCateory
}

export default function SidebarCategory({ category }: Props){

    const [ open, setOpen ] = useState(true);

    return <Box>
        <Stack direction="row" sx={{ justifyContent: "space-between" }} onClick={() => setOpen(o => !o)}>
            <Typography variant="body2">{ category.name }</Typography>
            { open ? <ArrowDropUp /> : <ArrowDropDown /> }
        </Stack>
        <Stack spacing={2} sx={{ paddingTop: 1, maxHeight: open ? undefined : 0, overflow: "hidden" }}>
            { category.pages.map( p => <SidebarLink key={p.url} page={p}/> )}
        </Stack>
    </Box>
}