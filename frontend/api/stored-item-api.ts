import { API_BASE_URL } from "./config";
import { StoredItem } from "@/data/stored_item";

export default class StoredItemApi {

    static async getStoredItems(): Promise<StoredItem[]> {
        const response = await fetch(API_BASE_URL+"/api/v1/stored-items")

        const json = await response.json() as StoredItem[];

        return json;
    }

    static async getStoredItemByItem(itemId: number): Promise<StoredItem[]> {

        const params = new URLSearchParams({
            item: itemId+""
        });

        const response = await fetch(API_BASE_URL+`/api/v1/stored-items?${params}`)

        const json = await response.json() as StoredItem[];

        return json;
    }

}