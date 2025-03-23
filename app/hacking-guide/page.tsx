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

export default function HackingGuideIntroPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold tracking-tight">FarHack Hacking Guide</h1>
      <p className="text-muted-foreground">
        Welcome to our Hacking Guide, a resource filled with potential hackathon ideas, rules of the road, community tools/docs, and everything else you'll need to get started hacking.
      </p>
      <div>
        <p className="text-muted-foreground">
          This is a resource you could read before participating in a FarHack, or even content to read if you want to start vibe coding Farcaster frames for the first time. Regardless, we want to set you up for success! 
          <br /><br />
          Below is an overview of the Hacking Guide's different sections and what they contain, if this is your first time reading it we recommend going through each page in order.
        </p>
      </div>
      <div className="pt-6">
        <h2 className="text-2xl font-bold tracking-tight pl-1 pb-1">Overview</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Name</TableHead>
              <TableHead>Description</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">
                <Link href="/hacking-guide/introduction">
                    Introduction
                </Link>
              </TableCell>
              <TableCell>Intro to the content in FarHack's Hacking Guide</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">
                <Link href="/hacking-guide/getting-started">
                    Getting Started
                </Link>
              </TableCell>
              <TableCell>Steps to help get your first hackathon project up and running</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">
                <Link href="/hacking-guide/participating-in-farhack">
                    Participating in FarHack
                </Link>
              </TableCell>
              <TableCell>An overview of submitting your project in a FarHack hackathon</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">
                <Link href="/hacking-guide/the-farstack">
                    The FarStack
                </Link>
              </TableCell>
              <TableCell>The developer tools and startups that make up Farcaster's ecosystem</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">
                <Link href="/hacking-guide/next-steps">
                    Next Steps
                </Link>
              </TableCell>
              <TableCell>Where to go next in your hacking journey</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  )
}