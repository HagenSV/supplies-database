import Link from "next/link";
import { Page } from "./pages";

interface Props {
    page: Page
}

export default function SidebarLink({ page }: Props){
    return <Link href={page.url}>{page.icon} { page.name }</Link>
}