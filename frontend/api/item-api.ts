import { Item } from "@/data/item";
import { API_BASE_URL } from "./config";

export default class ItemApi {

    static async getItems(): Promise<Item[]> {
        const response = await fetch(API_BASE_URL+"/api/v1/items")

        const json = await response.json() as Item[];

        return json;
    }

    static async searchItems(name: string){
        const params = new URLSearchParams({
            name
        })

        const response = await fetch(`${API_BASE_URL}/api/v1/items?${params}`)

        const json = await response.json() as Item[];

        return json;
    }

}