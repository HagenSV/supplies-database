import CategoryStoreProvider from "./category-store-provider";
import ContainerStoreProvider from "./container-store-provider";
import LocationStoreProvider from "./location-store-provider";

export default function GlobalContext({ children }: { children: React.ReactNode }){
    return <LocationStoreProvider>
        <CategoryStoreProvider>
            <ContainerStoreProvider>
                {children}
            </ContainerStoreProvider>
        </CategoryStoreProvider>
    </LocationStoreProvider>
}