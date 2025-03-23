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

export default function HackingGuideDocumentationResourcePage() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold tracking-tight">Documentation</h1>
      <p className="text-muted-foreground">
        Below is a collection of Farcaster-related documentation that will get you fully set up and ready to hack!
      </p>
      <div className="pt-6">
        <h2 className="text-2xl font-bold tracking-tight pl-1 pb-1">Farcaster Docs</h2>
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
      <div className="pt-6">
        <h2 className="text-2xl font-bold tracking-tight pl-1 pb-1">Neynar Docs</h2>
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
                <Link href="https://docs.neynar.com">
                    Official Website
                </Link>
              </TableCell>
              <TableCell>The homepage for Neynar's developer documentation</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">
                <Link href="https://docs.neynar.com/reference/quickstart">
                    Quickstart
                </Link>
              </TableCell>
              <TableCell>Start building on Farcaster with Neynar</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">
                <Link href="https://docs.neynar.com/docs/create-v2-farcaster-frame-in-60s">
                  {"Create Farcaster mini app (v2 frame) in < 60s"}
                </Link>
              </TableCell>
              <TableCell>Create a v2 Farcaster frame in less than 60 seconds</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">
                <Link href="https://docs.neynar.com/docs/how-to-create-a-farcaster-bot">
                    How to create a Farcaster bot
                </Link>
              </TableCell>
              <TableCell>Create a Farcaster bot on Neynar in a few quick steps</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">
                <Link href="https://docs.neynar.com/docs/how-to-get-trending-casts-on-farcaster">
                  Trending feed on Farcaster
                </Link>
              </TableCell>
              <TableCell>Show casts trending on the Farcaster network through Neynar</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">
                <Link href="https://docs.neynar.com/docs/guide-to-creating-a-farcaster-account-with-wallet-integration">
                  Create a Farcaster Account with Wallet Integration
                </Link>
              </TableCell>
              <TableCell>How to use Neynar to create a Farcaster account without having a end user mnemonic</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  )
}