'use client';

import ItemApi from "@/api/item-api";
import ItemSearchResult from "@/components/ItemSearchResult";
import { Item } from "@/data/item";
import { Box, Button, Divider, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function Home() {


  const [ search, setSearch ] = useState("");
  const [ items, setItems ] = useState<Item[]>([]);


  useEffect(() => {

    const fetch = async () => {
      const data = await ItemApi.getItems();

      setItems(data);
    }

    fetch();
    
  }, [])

  const searchItems = async (query: string) => {
    setSearch(query);

    const data = await ItemApi.searchItems(query);
    setItems(data);
  }

  return (
    <Stack spacing={3}>
      <Typography variant="h1">Search Supplies</Typography>

      <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
        <TextField 
          variant="outlined"
          label="Search Items"
          value={search}
          onChange={ (event) => searchItems(event.target.value) }
        />
      
      <Button variant="contained" onClick={() => window.location.href="/add"}>
        Add Item
      </Button>
      </Stack>

      <Typography variant="h2">Results</Typography>
      <Stack className="px-20" direction="column" divider={<Divider orientation="horizontal" flexItem/>}>
        { items.map( item => <ItemSearchResult key={item.item_id} item={item} /> ) }
      </Stack>
    </Stack>    
  );
}
