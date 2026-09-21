import ContainerApi from "@/api/container-api";
import { Container } from "@/data/container";

export class ContainerStore {
    private containers = new Map<number, Container>();
    private requests = new Map<number, Promise<Container>>();
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

    async createContainer(category: Omit<Container,"category_id">): Promise<void>{
        const created = await ContainerApi.createContainer(category);
        
        this.containers.set(created.container_id, created);
    }
    
    async getContainer(id: number): Promise<Container | null> {
        if (id === 0) return null;

        const cached = this.containers.get(id);
        if (cached) return cached;

        const existingRequest = this.requests.get(id);
        if (existingRequest) return existingRequest;
        
        const request = ContainerApi.getContainer(id)
            .then( c => {
                this.containers.set(c.container_id, c);
                return c;
            })
            .finally( () => this.requests.delete(id) );

        this.requests.set(id,request);

        return request;
    }
    
    async editContainer(id: number, data: Container): Promise<void> {
        //UPDATE api
        // setCategories( current => {
        //     const next = new Map(current);
        //     next.set(id, data);
        //     return next;
        // })
    }
    
    async deleteContainer(id: number): Promise<void> {
        const deleted = await ContainerApi.deleteContainer(id);
        if (!deleted) return;
        this.containers.delete(id);
    }
}