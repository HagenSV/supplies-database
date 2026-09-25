import { Category, Inventory, Place, Search, Toys } from "@mui/icons-material";

export const pages: PageCateory[] = [
    {
        name: "Administration",
        pages: [
            {
                name: "Categories",
                icon: <Category />,
                url: "/admin/categories"
            },
            {
                name: "Containers",
                icon: <Inventory />,
                url: "/admin/containers"
            },
            {
                name: "Items",
                icon: <Toys />,
                url: "/admin/items"
            },
            {
                name: "Locations",
                icon: <Place />,
                url: "/admin/locations"
            }
        ]
    },
    {
        name: "General",
        pages: [
            {
                name: "Search Items",
                icon: <Search />,
                url: "/"
            }
        ]
    }
]

export interface PageCateory {
    name: string,
    pages: Page[]
}

export interface Page {
    name: string,
    icon?: React.ReactElement
    url: string,
}