import ItemApi from "@/api/item-api";
import { Item } from "@/data/item";

export class ItemStore {
    private values = new Map<number, Item>();
    private requests = new Map<number, Promise<Item>>();
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

    constructor(private api: ItemApi){
        this.api.getAll()
            .then( c => {
                this.values = new Map(c.map( c => [c.item_id, c]))
                this.notify();
            })
    }

    getAll(): Item[] {
        const values = this.values.values().toArray();
        return values;
    }

    async search(query: Partial<Omit<Item,"item_id">>): Promise<Item[]> {
        return await this.api.search(query)
    }

    async create(category: Omit<Item,"item_id">): Promise<void>{
        const created = await this.api.create(category);
        
        this.values.set(created.item_id, created);
        this.notify();
    }
    
    async get(id: number): Promise<Item | null> {
        if (id === 0) return null;

        const cached = this.values.get(id);
        if (cached) return cached;

        const existingRequest = this.requests.get(id);
        if (existingRequest) return existingRequest;
        
        const request = this.api.get(id)
            .then( c => {
                this.values.set(c.item_id, c);
                this.notify();
                return c;
            })
            .finally( () => this.requests.delete(id) );

        this.requests.set(id,request);

        return request;
    }
    
    async update(data: Item): Promise<void> {
        await this.api.update(data);
        this.values.set(data.item_id, data);
        this.notify();
    }
    
    async delete(id: number): Promise<void> {
        const deleted = await this.api.delete (id);
        if (!deleted) return;
        this.values.delete(id);
        this.notify();
    }
}