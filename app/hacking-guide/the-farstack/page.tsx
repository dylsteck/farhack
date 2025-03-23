/* eslint-disable react/no-unescaped-entities */
import * as React from "react"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Link from "next/link"

export default function HackingGuideTheFarStackPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold tracking-tight">The FarStack</h1>
      <p className="text-muted-foreground">
        The FarStack is the set of developer tooling and infrastructure that make up Farcaster's protocol and developer ecosystem.
        While <Link href="https://dylansteck.com/blog/the-farstack">this blog post on The FarStack</Link> goes further into what all of that looks like/means, the goal of this page is to highlight the particular pieces of developer tooling in the FarStack that you could make use of.
      </p>
    </div>
  )
}