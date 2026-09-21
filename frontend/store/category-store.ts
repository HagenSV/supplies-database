import CategoryApi from "@/api/category-api";
import { Category } from "@/data/category";

export class CategoryStore {
    private categories = new Map<number, Category>();
    private requests = new Map<number, Promise<Category>>();
    private listeners = new Set<() => void>();

    subscribe = (listener: () => void) => {
        this.listeners.add(listener);

        return () => {
            this.listeners.delete(listener);
        }
    }

    private notify() {
        this.listeners.forEach(listener => listener())
    }

    async createCategory(category: Omit<Category,"category_id">): Promise<void>{
        const created = await CategoryApi.createCategory(category);
        
        this.categories.set(created.category_id, created);
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
                return c;
            })
            .finally( () => this.requests.delete(id) );

        this.requests.set(id,request);

        return request;
    }
    
    async editCategory(id: number, data: Category): Promise<void> {
        //UPDATE api
        // setCategories( current => {
        //     const next = new Map(current);
        //     next.set(id, data);
        //     return next;
        // })
    }
    
    async deleteCategory(id: number): Promise<void> {
        const deleted = await CategoryApi.deleteCategory(id);
        if (!deleted) return;
        this.categories.delete(id);
    }
}