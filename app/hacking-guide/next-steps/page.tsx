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

export default function HackingGuideNextStepsPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold tracking-tight">Next Steps</h1>
      <p className="text-muted-foreground">
        Welcome to our Hacking Guide, a resource filled with potential hackathon ideas, rules of the road, community tools/docs, and everything else you'll need to get started hacking.
      </p>
    </div>
  )
}