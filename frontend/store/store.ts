// import CrudApi from "@/api/crud-api";


// type NumericKey<T> = {
//     [K in keyof T]: T[K] extends number ? K : never;
// }[keyof T];

// export class GenericStore<T, K extends NumericKey<T>> {
//     private values = new Map<number, T>();
//     private requests = new Map<number, Promise<T>>();
//     private listeners: (() => void)[] = [];

//     subscribe = (listener: () => void) => {
//         this.listeners.push(listener);

//         listener();

//         return () => {
//             this.listeners.filter(l => l !== listener);
//         }
//     }

//     private notify() {
//         this.listeners.forEach(listener => listener())
//     }

//     constructor(private api: CrudApi<T,K> ){
//         this.api.getAll()
//             .then( c => {
//                 this.values = new Map(c.map( c => [0, c]))
//                 this.notify();
//             })
//     }
 
//     getAll(): T[] {
//         const values = this.values.values().toArray();
//         return values;
//     }

//     async create(category: Omit<T,K>): Promise<void>{
//         const created = await this.api.create(category);
        
//         this.values.set(created.id, created);
//         this.notify();
//     }
    
//     async getCategory(id: number): Promise<T | null> {
//         if (id === 0) return null;

//         const cached = this.values.get(id);
//         if (cached) return cached;

//         const existingRequest = this.requests.get(id);
//         if (existingRequest) return existingRequest;
        
//         const request = this.api.get(id)
//             .then( c => {
//                 this.values.set(c.id, c);
//                 this.notify();
//                 return c;
//             })
//             .finally( () => this.requests.delete(id) );

//         this.requests.set(id,request);

//         return request;
//     }
    
//     async updateCategory(data: T): Promise<void> {
//         await this.api.update(data);
//         this.values.set(data.id, data);
//         this.notify();
//     }
    
//     async deleteCategory(id: number): Promise<void> {
//         const deleted = await this.api.delete(id);
//         if (!deleted) return;
//         this.values.delete(id);
//         this.notify();
//     }
// }