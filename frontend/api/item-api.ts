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

    static async create(item: Omit<Item,"item_id">){
        const response = await fetch(`${API_BASE_URL}/api/v1/items`, {
                method: "POST",
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify(item)
            }
        );
        const json = await response.json() as Item;
        return json;
    }

    static async update(item: Item){
        const response = await fetch(`${API_BASE_URL}/api/v1/items/${item.item_id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify(item)
            }
        )
    }

    static async delete(id: number){
        const response = await fetch(`${API_BASE_URL}/api/v1/items/${id}`, {
                method: "DELETE",
            }
        )
    }
}