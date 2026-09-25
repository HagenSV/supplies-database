import { Item } from "@/data/item";
import { API_BASE_URL } from "./config";
import CrudApi from "./crud-api";

export default class ItemApi implements CrudApi<Item,"item_id"> {

    async getAll(): Promise<Item[]> {
        const response = await fetch(API_BASE_URL+"/api/v1/items")

        const json = await response.json() as Item[];

        return json;
    }
    
    async search(query: Partial<Omit<Item,"item_id">>){
        const params = new URLSearchParams({
            name: query.item_name ?? ""
        })

        const response = await fetch(`${API_BASE_URL}/api/v1/items?${params}`)

        const json = await response.json() as Item[];

        return json;
    }

    async create(item: Omit<Item,"item_id">){
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

    async get(id: number): Promise<Item> {
        const response = await fetch(`${API_BASE_URL}/api/v1/item/${id}`)

        const json = await response.json() as Item;

        return json;
    }

    async update(item: Item){
        const response = await fetch(`${API_BASE_URL}/api/v1/items/${item.item_id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify(item)
            }
        )

        return response.ok
    }

    async delete(id: number){
        const response = await fetch(`${API_BASE_URL}/api/v1/items/${id}`, {
                method: "DELETE",
            }
        )

        return response.ok
    }
}