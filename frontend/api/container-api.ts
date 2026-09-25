import { Container } from "@/data/container";
import { API_BASE_URL } from "./config";

export default class ContainerApi {

    static async getContainers(): Promise<Container[]> {
        const response = await fetch(`${API_BASE_URL}/api/v1/containers`)

        const json = await response.json() as Container[];
        console.log(json)
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
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(container)
        })

        const json = await response.json() as Container;

        return json;
    }

    static async updateContainer(container: Container) {
        
        const response = await fetch(`${API_BASE_URL}/api/v1/containers/${container.container_id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(container)
        })
    }

    static async deleteContainer(id: number): Promise<boolean> {
        const response = await fetch(`${API_BASE_URL}/api/v1/containers/${id}`,{
            method: "DELETE"
        })

        return response.ok
    }

}