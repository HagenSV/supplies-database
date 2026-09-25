"use client"

import { useSyncExternalStore } from "react"

interface Props {
    children: React.ReactNode
}


export default function ClientOnly({ children }: Props) {
  const isClient = useSyncExternalStore(
    () => () => {},   // no-op subscribe
    () => true,       // client snapshot
    () => false       // server snapshot
  )
  return isClient ? children : null
}