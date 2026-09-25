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

    constructor(){
        LocationApi.getLocations()
            .then( c => {
                this.locations = new Map(c.map( c => [c.location_id, c]))
                this.notify();
            })
    }

    getLocations(): Location[] {
        return this.locations.values().toArray();
    }

    async createLocation(location: Omit<Location,"location_id">): Promise<void>{
        const created = await LocationApi.createLocation(location);
        
        this.locations.set(created.location_id, created);
    }
    
    getLocation(id: number): Location | null {
        if (id === 0) return null;

        const cached = this.locations.get(id);
        if (cached) return cached;

        const existingRequest = this.requests.get(id);
        if (existingRequest) return null;
        
        const request = LocationApi.getLocation(id)
            .then( r => {
                this.locations.set(r.location_id, r);
                this.notify();
                return r;
            })
            .finally( () => this.requests.delete(id) );

        this.requests.set(id,request);
        return null;
    }
    
    async updateLocation(data: Location): Promise<void> {
        await LocationApi.updateLocation(data);
        this.locations.set(data.location_id,data);
        this.notify();
    }
    
    async deleteLocation(id: number): Promise<void> {
        const deleted = await LocationApi.deleteLocation(id);
        if (!deleted) return;
        this.locations.delete(id);
        this.notify();
    }
}