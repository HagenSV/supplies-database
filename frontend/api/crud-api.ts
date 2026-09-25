export default interface CrudApi<T,K extends keyof any> {
    getAll: () => Promise<T[]>
    search: (query: Partial<Omit<T,K>>) => Promise<T[]>
    create: (data: Omit<T,K>) => Promise<T>
    get: (id: number) => Promise<T>
    update: (data: T) => Promise<boolean>
    delete: (id: number) => Promise<boolean>
}