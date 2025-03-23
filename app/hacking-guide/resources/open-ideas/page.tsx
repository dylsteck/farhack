"use client";

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
import FrameLink from "@/components/custom/frame-link"

export default function HackingGuideOpenIdeasResourcePage() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold tracking-tight">Open Ideas</h1>
      <p className="text-muted-foreground">
        Stuck or still trying to figure out what to build? 
        <br/>
        Below is an exhaustive list of open ideas from community members.
        <br /><br/>
        Note: Many of these ideas have frames v2 in mind and come from <FrameLink type="url" identifier="https://warpcast.com/linda/0xc9aa02a8">Linda Xie's crowdsourced document</FrameLink>
      </p>
      <ol className="list-decimal list-inside space-y-1 pt-5">
        <li>Decentralized community notes using token rewards for submitting accurate info (<Link href="https://warpcast.com/sophia">sophia</Link>)</li>
        <li>Pooltogether frame - easily depositing your USDC Rewards to onchain prize savings (<Link href="https://warpcast.com/thumbsup.eth">thumbsup.eth</Link>, <Link href="https://warpcast.com/nomygod.eth">nomygod.eth</Link>)</li>
        <li>Turning any live stream url into a live chat for Farcaster users (<Link href="https://warpcast.com/sdv.eth">sdv.eth</Link>, <Link href="https://warpcast.com/ted">ted</Link>)</li>
        <li>Crypto mahjong (<Link href="https://warpcast.com/toby">toby</Link>)</li>
        <li>FarMart similar to Amazon/tiktok shop (<Link href="https://warpcast.com/mcbain">mcbain</Link>)</li>
        <li>A high school style yearbook but for farcaster. PFP gallery of all users + give me a place to sign “have a great summer” (<Link href="https://warpcast.com/anonpapi.eth">anonpapi.eth</Link>)</li>
        <li>Group buy mini-app (<Link href="https://warpcast.com/dharmi">dharmi</Link>)</li>
        <li>Tinder onchain (<Link href="https://warpcast.com/toyboy.eth">toyboy.eth</Link>, <Link href="https://warpcast.com/dawufi">dawufi</Link>)</li>
        <li>"Pop up" waifu frame with minting (<Link href="https://warpcast.com/dwr.eth">dwr.eth</Link>)</li>
        <li>Index NFT mints, candles for sale, donations, other onchain tchotchkes (<Link href="https://warpcast.com/dwr.eth">dwr.eth</Link>)</li>
        <li>Send a Valentine to another Farcaster user (<Link href="https://warpcast.com/oxb">oxb</Link>)</li>
        <li>SOL-based coin airdrop for FC accounts with SOL-connected wallets (<Link href="https://warpcast.com/yes2crypto.eth">yes2crypto.eth</Link>)</li>
        <li>Sims-like relationship frame/app for measuring your standing with recently interacted people (<Link href="https://warpcast.com/sdv.eth">sdv.eth</Link>)</li>
        <li>Frame that allows you to post something and lock the content behind the paywall or make it available only to some fids (<Link href="https://warpcast.com/woj.eth">woj.eth</Link>)</li>
        <li>Chatroulette for farcaster builders (<Link href="https://warpcast.com/catch0x22.eth">catch0x22.eth</Link>)</li>
        <li>Send voice messages (<Link href="https://warpcast.com/mikadoe.eth">mikadoe.eth</Link>)</li>
        <li>A reverse bounty board where moonshot ideas requesting funding are posted like grant requests (<Link href="https://warpcast.com/roadu">roadu</Link>)</li>
        <li>Disperse.app as a Base Frame w/ social graph (<Link href="https://warpcast.com/m-j-r.eth">m-j-r.eth</Link>)</li>
        <li>Chinese New Year frame (<Link href="https://warpcast.com/rileybeans">rileybeans</Link>)</li>
        <li>Governance frame: Use the votes surfaced by Agora, identify if you're eligible for a vote, send in-app notification (<Link href="https://warpcast.com/dwr.eth">dwr.eth</Link>)</li>
        <li>Charity of the week frame (<Link href="https://warpcast.com/dwr.eth">dwr.eth</Link>)</li>
        <li>Onchain Powerball (<Link href="https://warpcast.com/dwr.eth">dwr.eth</Link>)</li>
        <li>Bingo (<Link href="https://warpcast.com/vmathur">vmathur</Link>)</li>
        <li>Poker (<Link href="https://warpcast.com/streetphoto">streetphoto</Link>)</li>
        <li>Onchain time-based / turn-based social game (<Link href="https://warpcast.com/dwr.eth">dwr.eth</Link>)</li>
        <li>Notifies you if your frame expires soon (<Link href="https://warpcast.com/baseddesigner.eth">baseddesigner.eth</Link>)</li>
        <li>Guided meditations (<Link href="https://warpcast.com/eriks">eriks</Link>)</li>
        <li>Space Trader or Drug Wars game (<Link href="https://warpcast.com/dwr.eth">dwr.eth</Link>)</li>
        <li>Freeciv Longturn Farcaster (<Link href="https://warpcast.com/dwr.eth">dwr.eth</Link>)</li>
        <li>Crypto charity donations (<Link href="https://warpcast.com/vmathur">vmathur</Link>)</li>
        <li>Farcaster fishing minigame (<Link href="https://warpcast.com/horsefacts.eth">horsefacts.eth</Link>)</li>
        <li>Linktree of all the FC native token launchers (<Link href="https://warpcast.com/dwr.eth">dwr.eth</Link>)</li>
        <li>GoFundMe for Farcaster (<Link href="https://warpcast.com/shulzzz">shulzzz</Link>, <Link href="https://warpcast.com/aneri">aneri</Link>)</li>
        <li>A Turing Test app - join a group chat and guess who the bot is (<Link href="https://warpcast.com/ccarella.eth">ccarella.eth</Link>)</li>
        <li>Fario Party multiplayer inframe minigames (<Link href="https://warpcast.com/ccarella.eth">ccarella.eth</Link>)</li>
        <li>Skribbl - group drawing game where you guess a drawing from someone else (<Link href="https://warpcast.com/leovido.eth">leovido.eth</Link>)</li>
        <li>Foursquare 2.0 (<Link href="https://warpcast.com/dwr.eth">dwr.eth</Link>)</li>
        <li>Sell a file frame / cryptonative gumroad (<Link href="https://warpcast.com/dwr.eth">dwr.eth</Link>)</li>
        <li>Carousel frame - tap open the frame, display a grid of images like an Instagram profile (<Link href="https://warpcast.com/dwr.eth">dwr.eth</Link>)</li>
      </ol>
    </div>
  )
}