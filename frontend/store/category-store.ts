import CategoryApi from "@/api/category-api";
import { Category } from "@/data/category";

export class CategoryStore {
    private categories = new Map<number, Category>();
    private requests = new Map<number, Promise<Category>>();
    private listeners: (() => void)[] = [];

    subscribe = (listener: () => void) => {
        this.listeners.push(listener);

        listener();

        return () => {
            this.listeners.filter(l => l !== listener);
        }
    }

    private notify() {
        this.listeners.forEach(listener => listener())
    }

    constructor(){
        CategoryApi.getCategories()
            .then( c => {
                this.categories = new Map(c.map( c => [c.category_id, c]))
                this.notify();
            })
    }

    getCategories(): Category[] {
        const values = this.categories.values().toArray();
        return values;
    }

    async createCategory(category: Omit<Category,"category_id">): Promise<void>{
        const created = await CategoryApi.createCategory(category);
        
        this.categories.set(created.category_id, created);
        this.notify();
    }
    
    async getCategory(id: number): Promise<Category | null> {
        if (id === 0) return null;

        const cached = this.categories.get(id);
        if (cached) return cached;

        const existingRequest = this.requests.get(id);
        if (existingRequest) return existingRequest;
        
        const request = CategoryApi.getCategory(id)
            .then( c => {
                this.categories.set(c.category_id, c);
                this.notify();
                return c;
            })
            .finally( () => this.requests.delete(id) );

        this.requests.set(id,request);

        return request;
    }
    
    async updateCategory(data: Category): Promise<void> {
        await CategoryApi.updateCategory(data);
        this.categories.set(data.category_id, data);
        this.notify();
    }
    
    async deleteCategory(id: number): Promise<void> {
        const deleted = await CategoryApi.deleteCategory(id);
        if (!deleted) return;
        this.categories.delete(id);
        this.notify();
    }
}