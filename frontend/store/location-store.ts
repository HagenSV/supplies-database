import LocationApi from "@/api/location-api";
import { Category } from "@/data/category";
import { Location } from "@/data/location";

export class LocationStore {
    private locations = new Map<number, Location>();
    private requests = new Map<number, Promise<Location>>();
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

    async createLocation(location: Omit<Location,"location_id">): Promise<void>{
        const created = await LocationApi.createLocation(location);
        
        this.locations.set(created.location_id, created);
    }
    
    async getLocation(id: number): Promise<Location | null> {
        if (id === 0) return null;

        const cached = this.locations.get(id);
        if (cached) return cached;

        const existingRequest = this.requests.get(id);
        if (existingRequest) return existingRequest;
        
        const request = LocationApi.getLocation(id)
            .then( r => {
                this.locations.set(r.location_id, r);
                return r;
            })
            .finally( () => this.requests.delete(id) );

        this.requests.set(id,request);

        return request;
    }
    
    async editLocation(id: number, data: Category): Promise<void> {
        //UPDATE api

    }
    
    async deleteLocation(id: number): Promise<void> {
        const deleted = await LocationApi.deleteLocation(id);
        if (!deleted) return;
        this.locations.delete(id);
    }
}