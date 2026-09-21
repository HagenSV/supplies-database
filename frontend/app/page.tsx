'use client';

import ItemApi from "@/api/item-api";
import ItemSearchResult from "@/components/ItemSearchResult";
import { Item } from "@/data/item";
import { TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function Home() {

  const [ items, setItems ] = useState<Item[]>([]);

  useEffect(() => {

    const fetch = async () => {
      const data = await ItemApi.getItems();

      setItems(data);
    }

    fetch();
    
  })

  return (
    <div>
      <Typography variant="h1">Search Supplies</Typography>
        <TextField variant="outlined" />
      
      <Typography variant="h2">Results</Typography>
      { items.map( item => <ItemSearchResult key={item.item_id} item={item} /> ) }
    </div>    
  );
}
