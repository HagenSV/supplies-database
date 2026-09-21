import { Location } from "@/data/location";
import { API_BASE_URL } from "./config";

export default class LocationApi {

    static async getLocations(): Promise<Location[]> {
        const response = await fetch(`${API_BASE_URL}/api/v1/locations`)

        const json = await response.json() as Location[];

        return json;
    }

    static async getLocation(id: number): Promise<Location> {
        const response = await fetch(`${API_BASE_URL}/api/v1/locations/${id}`);

        const json = await response.json() as Location;

        return json;
    }

    static async createLocation(location: Omit<Location,"location_id">): Promise<Location> {
        
        const response = await fetch(`${API_BASE_URL}/api/v1/locations`, {
            method: "POST",
            body: JSON.stringify(location)
        })

        const json = await response.json() as Location;

        return json;
    }

    static async deleteLocation(id: number): Promise<boolean> {
        const response = await fetch(`${API_BASE_URL}/api/v1/locations/${id}`,{
            method: "DELETE"
        })

        return response.ok
    }

}