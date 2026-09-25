import CategoriesTable from "@/components/category/CategoriesTable";
import ClientOnly from "@/components/ClientOnly";

export default function ManageCategories(){
    return <ClientOnly><CategoriesTable /></ClientOnly>
}