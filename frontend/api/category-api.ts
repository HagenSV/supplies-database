import { API_BASE_URL } from "./config";
import { Category } from "@/data/category";

export default class CategoryApi {

    static async getCategories(): Promise<Category[]> {
        const response = await fetch(`${API_BASE_URL}/api/v1/categories`)

        const json = await response.json() as Category[];

        return json;
    }

    static async getCategory(id: number): Promise<Category> {
        const response = await fetch(`${API_BASE_URL}/api/v1/categories/${id}`)

        const json = await response.json() as Category;

        return json;
    }
    
    static async createCategory(category: Omit<Category,"category_id">): Promise<Category> {
        
        const response = await fetch(`${API_BASE_URL}/api/v1/categories`, {
            method: "POST",
            body: JSON.stringify(category)
        })

        const json = await response.json() as Category;

        return json;
    }

    static async deleteCategory(id: number): Promise<boolean> {
        const response = await fetch(`${API_BASE_URL}/api/v1/categories/${id}`,{
            method: "DELETE"
        })

        return response.ok
    }

}