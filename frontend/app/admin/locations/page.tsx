import ClientOnly from "@/components/ClientOnly";
import LocationsTable from "@/components/location/LocationsTable";

export default function ManageLocations(){
    return <ClientOnly><LocationsTable /></ClientOnly>
}