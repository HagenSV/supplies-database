import { Container } from "@/data/container";
import { API_BASE_URL } from "./config";

export default class ContainerApi {

    static async getContainers(): Promise<Container[]> {
        const response = await fetch(`${API_BASE_URL}/api/v1/containers`)

        const json = await response.json() as Container[];

        return json;
    }

    static async getContainer(id: number): Promise<Container> {
        const response = await fetch(`${API_BASE_URL}/api/v1/containers/${id}`);

        const json = await response.json() as Container;

        return json;
    }

    static async createContainer(container: Omit<Container,"container_id">): Promise<Container> {
        
        const response = await fetch(`${API_BASE_URL}/api/v1/containers`, {
            method: "POST",
            body: JSON.stringify(container)
        })

        const json = await response.json() as Container;

        return json;
    }

    static async deleteContainer(id: number): Promise<boolean> {
        const response = await fetch(`${API_BASE_URL}/api/v1/containers/${id}`,{
            method: "DELETE"
        })

        return response.ok
    }

}