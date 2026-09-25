import { API_BASE_URL } from "./config";
import { Category } from "@/data/category";
import CrudApi from "./crud-api";

export default class CategoryApi implements CrudApi<Category, "category_id"> {

    async getAll(): Promise<Category[]> {
        const response = await fetch(`${API_BASE_URL}/api/v1/categories`)
        const json = await response.json() as Category[];
        return json;
    }

    async search(query: Partial<Omit<Category,"category_id">>): Promise<Category[]> {
        const response = await fetch(`${API_BASE_URL}/api/v1/categories`)
        const json = await response.json() as Category[];
        return json;
    }
    
    async create(category: Omit<Category,"category_id">): Promise<Category> {
        const response = await fetch(`${API_BASE_URL}/api/v1/categories`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(category)
        })
        const json = await response.json() as Category;
        return json;
    }

    async get(id: number): Promise<Category> {
        const response = await fetch(`${API_BASE_URL}/api/v1/categories/${id}`)
        const json = await response.json() as Category;
        return json;
    }

    async update(category: Category): Promise<boolean> {
        const response = await fetch(`${API_BASE_URL}/api/v1/categories/${category.category_id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(category)
        })

        return response.ok
    }

    async delete(id: number): Promise<boolean> {
        const response = await fetch(`${API_BASE_URL}/api/v1/categories/${id}`,{
            method: "DELETE"
        })
        return response.ok
    }
}