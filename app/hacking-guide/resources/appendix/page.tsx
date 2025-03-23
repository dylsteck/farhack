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

export default function HackingGuideAppendixResourcePage() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold tracking-tight">Appendix</h1>
      <p className="text-muted-foreground">
        The Appendix below is an assortment of useful links for hacking that didn't fit into the other resource pages.
      </p>
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
              <Link href="https://docs.farcaster.xyz">
                  Official Website
              </Link>
            </TableCell>
            <TableCell>The homepage for Farcaster's developer documentation</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">
              <Link href="https://docs.farcaster.xyz/developers/frames/v2/">
                  Frames v2 Introduction
              </Link>
            </TableCell>
            <TableCell>An overview of Farcaster Frames v2, new mini apps that live in the social feed</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">
              <Link href="https://docs.farcaster.xyz/developers/frames/v2/spec">
                  Frames v2 Specification
              </Link>
            </TableCell>
            <TableCell>The full Frames v2 spec and an overview of the Client SDK API</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">
              <Link href="https://docs.farcaster.xyz/auth-kit/installation">
                  AuthKit Installation
              </Link>
            </TableCell>
            <TableCell>How to use AuthKit, Farcaster's SDK for implementing Sign In with Farcaster</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">
              <Link href="https://docs.farcaster.xyz/learn">
                  Learn about the protocol
              </Link>
            </TableCell>
            <TableCell>Learn about Farcaster, how the protocol runs, and more</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">
              <Link href="https://docs.farcaster.xyz/reference/">
                  Reference
              </Link>
            </TableCell>
            <TableCell>References to Warpcast APIs, Hubble HTTP/GRPC APIs, contracts, and other specs</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}