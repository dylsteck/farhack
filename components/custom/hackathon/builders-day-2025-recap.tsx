'use client';

import React from 'react';
import { Trophy, Award, Medal } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

// Define color utility classes
const styles = {
  gold: "text-yellow-500",
  silver: "text-gray-400",
  bronze: "text-amber-700",
  bgGold: "bg-yellow-500",
  bgSilver: "bg-gray-400",
  bgBronze: "bg-amber-700"
};

export default function BuildersDay2025Recap({ children }: { children?: React.ReactNode }) {
  // Hardcoded winners data
  const winners = [
    {
      position: 1,
      name: "Team Farcaster Protocol",
      project: "Protocol Expansion",
      prize: "$5,000",
      description: "Innovative protocol expansion that enhances user experience across the platform",
      image: "/images/winners/team1.png" // placeholder image path
    },
    {
      position: 2,
      name: "Frames Wizards",
      project: "Frame Generator",
      prize: "$3,000",
      description: "Powerful tool for creating interactive Frames with minimal coding required",
      image: "/images/winners/team2.png" // placeholder image path
    },
    {
      position: 3,
      name: "Far Horizons",
      project: "Community Analytics",
      prize: "$2,000",
      description: "Comprehensive analytics dashboard for tracking community engagement metrics",
      image: "/images/winners/team3.png" // placeholder image path
    }
  ];

  // Complete list of all projects
  const allProjects = [
    { name: "Protocol Expansion", team: "Team Farcaster Protocol", category: "Infrastructure", prize: "$5,000", winner: true },
    { name: "Frame Generator", team: "Frames Wizards", category: "Developer Tools", prize: "$3,000", winner: true },
    { name: "Community Analytics", team: "Far Horizons", category: "Analytics", prize: "$2,000", winner: true },
    { name: "Cast Composer", team: "Typecast", category: "User Experience", prize: "$1,500" },
    { name: "Channel Explorer", team: "Channelers", category: "Discovery", prize: "$1,500" },
    { name: "Decentralized Storage", team: "DataDAO", category: "Infrastructure", prize: "$1,000" },
    { name: "Social Graph Visualizer", team: "GraphDevs", category: "Analytics", prize: "$1,000" },
    { name: "Farcaster Mobile", team: "MobileCasters", category: "Mobile", prize: "$1,000" },
    { name: "Cross-Platform Identity", team: "Identity Matrix", category: "Identity", prize: "$1,000" },
    { name: "Frames Marketplace", team: "FrameSpace", category: "Commerce", prize: "$1,000" },
    { name: "Caster AI Assistant", team: "AI Casters", category: "AI", prize: "$1,000" },
    { name: "On-Chain Verifications", team: "Chain Verifiers", category: "Security", prize: "$1,000" },
    { name: "Cast Scheduler", team: "TimeCast", category: "Productivity", prize: "$500" },
    { name: "Farcaster Search", team: "SearchCast", category: "Discovery", prize: "$500" },
    { name: "Channel Management", team: "Channel Admins", category: "Moderation", prize: "$500" },
    { name: "Cast to NFT", team: "NFCast", category: "NFT", prize: "$500" },
    { name: "Event Coordination", team: "EventCast", category: "Events", prize: "$500" },
    { name: "Feed Curator", team: "CuratorDAO", category: "Content", prize: "$500" },
    { name: "Recommendation Engine", team: "RecEngine", category: "AI", prize: "$500" },
    { name: "Developer Documentation", team: "DocCasters", category: "Documentation", prize: "$500" }
  ];

  return (
    <div className="w-full min-h-screen md:min-h-full">
      <div className="w-full h-full flex justify-center">
        <div className="rounded-none md:rounded-2xl w-full max-w-full lg:w-full min-h-screen md:min-h-full border border-transparent md:border-neutral-200 dark:md:border-white/10 bg-white dark:bg-black/40 dark:backdrop-blur-md mt-4 text-black dark:text-white overflow-x-hidden overflow-y-auto">
          <div className="w-full border-b border-neutral-200 dark:border-white/10">
            <div className="w-full m-1 mt-0 md:mt-3.5 pb-1">
              {/* <HackathonNav hackathon={hackathon as unknown as Hackathon} /> */}
            </div>
          </div>
          <div className="w-full py-8 px-2">
            <div className="max-w-full mx-auto">
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-10 text-center bg-gradient-to-r from-orange-500 to-purple-600 dark:from-orange-400 dark:to-purple-500 bg-clip-text text-transparent">Builders Day 2025 Recap</h1>
              
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                {/* Builders Day Logo Tile - Larger and on left side in desktop */}
                <div className="md:col-span-1 lg:col-span-1 md:row-span-2 rounded-xl p-4 md:p-6 flex items-center justify-center">
                  <div className="w-full h-full max-w-xs mx-auto flex items-center justify-center">
                    <img 
                      src="https://i.imgur.com/AWLzIaQ.png" 
                      alt="Builders Day 2025" 
                      className="w-full h-auto rounded-xl shadow-lg border-2 border-orange-500 dark:border-orange-600"
                    />
                  </div>
                </div>

                {/* Description Tile */}
                <div className="md:col-span-2 lg:col-span-3 rounded-xl p-4 md:p-6 flex items-center">
                  <div className="text-center md:text-left">
                    <p className="text-xl md:text-2xl text-black/80 dark:text-white/80 font-medium">
                      Celebrating the incredible projects and teams that made Builders Day 2025 an unforgettable event
                    </p>
                  </div>
                </div>

                {/* Statistics Tiles */}
                <div className="md:col-span-2 lg:col-span-1 rounded-xl p-4 md:p-6 flex flex-col items-center justify-center border border-neutral-200 dark:border-neutral-800 backdrop-blur-sm">
                  <h3 className="text-5xl font-bold bg-gradient-to-r from-emerald-500 to-green-600 bg-clip-text text-transparent">135</h3>
                  <p className="text-neutral-700 dark:text-neutral-300 font-medium">Participants</p>
                </div>

                <div className="md:col-span-2 lg:col-span-1 rounded-xl p-4 md:p-6 flex flex-col items-center justify-center border border-neutral-200 dark:border-neutral-800 backdrop-blur-sm">
                  <h3 className="text-5xl font-bold bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">20</h3>
                  <p className="text-neutral-700 dark:text-neutral-300 font-medium">Projects</p>
                </div>

                <div className="md:col-span-2 lg:col-span-1 rounded-xl p-4 md:p-6 flex flex-col items-center justify-center border border-neutral-200 dark:border-neutral-800 backdrop-blur-sm">
                  <h3 className="text-5xl font-bold bg-gradient-to-r from-amber-500 to-yellow-600 bg-clip-text text-transparent">$24,000</h3>
                  <p className="text-neutral-700 dark:text-neutral-300 font-medium">Total Prizes</p>
                </div>

                {/* Winners Pod */}
                <div className="col-span-1 md:col-span-3 lg:col-span-4 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl p-4 md:p-6">
                  <h2 className="text-2xl font-semibold mb-8 text-center">
                    <Trophy className="inline-block mr-2 mb-1" size={28} />
                    Grand Prize Winners
                  </h2>
                  
                  <div className="relative flex flex-col md:flex-row justify-center items-end gap-4 md:gap-8 h-auto md:h-[300px] mb-8 mt-16">
                    {/* Second place */}
                    <div className="order-2 md:order-1 w-full md:w-1/3 h-auto pb-6 md:h-[220px] bg-gradient-to-b from-neutral-100 to-neutral-200 dark:from-zinc-800 dark:to-zinc-900 rounded-t-lg border border-neutral-300 dark:border-zinc-700 shadow-lg relative mb-14 md:mb-0">
                      <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
                        <div className="bg-neutral-100 dark:bg-zinc-800 size-24 rounded-full flex items-center justify-center border-2 border-neutral-300 dark:border-zinc-700">
                          <Medal size={40} className={styles.silver} />
                        </div>
                        <div className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 ${styles.bgSilver} text-white font-bold rounded-full size-8 flex items-center justify-center`}>
                          2
                        </div>
                      </div>
                      <div className="p-6 pt-16 text-center">
                        <h3 className="font-bold text-xl">{winners[1].name}</h3>
                        <p className="text-neutral-700 dark:text-neutral-300 font-medium">{winners[1].project}</p>
                        <p className="text-emerald-600 dark:text-emerald-400 font-bold text-xl mt-2">{winners[1].prize}</p>
                      </div>
                    </div>
                    
                    {/* First place - taller */}
                    <div className="order-1 md:order-2 w-full md:w-1/3 h-auto pb-6 md:h-[260px] bg-gradient-to-b from-amber-50 to-amber-100 dark:from-amber-900/30 dark:to-amber-800/20 rounded-t-lg border border-amber-200 dark:border-amber-700/50 shadow-xl relative mb-14 md:mb-0">
                      <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
                        <div className="bg-amber-50 dark:bg-amber-900/30 size-24 rounded-full flex items-center justify-center border-2 border-amber-200 dark:border-amber-700/50">
                          <Trophy size={40} className={styles.gold} />
                        </div>
                        <div className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 ${styles.bgGold} text-white font-bold rounded-full size-8 flex items-center justify-center`}>
                          1
                        </div>
                      </div>
                      <div className="p-6 pt-16 text-center">
                        <h3 className="font-bold text-xl">{winners[0].name}</h3>
                        <p className="text-neutral-700 dark:text-neutral-300 font-medium">{winners[0].project}</p>
                        <p className="text-emerald-600 dark:text-emerald-400 font-bold text-xl mt-2">{winners[0].prize}</p>
                      </div>
                    </div>
                    
                    {/* Third place */}
                    <div className="order-3 w-full md:w-1/3 h-auto pb-6 md:h-[180px] bg-gradient-to-b from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/10 rounded-t-lg border border-orange-200 dark:border-orange-800/30 shadow-lg relative mb-14 md:mb-0">
                      <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
                        <div className="bg-orange-50 dark:bg-orange-900/20 size-24 rounded-full flex items-center justify-center border-2 border-orange-200 dark:border-orange-800/30">
                          <Award size={40} className={styles.bronze} />
                        </div>
                        <div className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 ${styles.bgBronze} text-white font-bold rounded-full size-8 flex items-center justify-center`}>
                          3
                        </div>
                      </div>
                      <div className="p-6 pt-16 text-center">
                        <h3 className="font-bold text-xl">{winners[2].name}</h3>
                        <p className="text-neutral-700 dark:text-neutral-300 font-medium">{winners[2].project}</p>
                        <p className="text-emerald-600 dark:text-emerald-400 font-bold text-xl mt-2">{winners[2].prize}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* All Projects Table */}
                <div className="col-span-1 md:col-span-3 lg:col-span-4 bg-white dark:bg-zinc-900/40 rounded-xl p-4 md:p-6">
                  <h2 className="text-2xl font-semibold mb-6 text-center">All Projects</h2>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b border-neutral-200 dark:border-neutral-700">
                          <th className="px-4 py-3 text-left font-semibold">Project</th>
                          <th className="px-4 py-3 text-left font-semibold">Team</th>
                          <th className="px-4 py-3 text-left font-semibold hidden md:table-cell">Category</th>
                          <th className="px-4 py-3 text-right font-semibold">Prize</th>
                        </tr>
                      </thead>
                      <tbody>
                        {allProjects.map((project, index) => (
                          <tr 
                            key={index} 
                            className={`border-b border-neutral-100 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-zinc-800/50 transition-colors ${project.winner ? 'bg-amber-50/30 dark:bg-amber-900/10' : ''}`}
                          >
                            <td className="px-4 py-3 font-medium">
                              {project.name}
                              {project.winner && (
                                <span className="ml-2 inline-flex items-center">
                                  <Trophy size={14} className={styles.gold} />
                                </span>
                              )}
                            </td>
                            <td className="px-4 py-3">{project.team}</td>
                            <td className="px-4 py-3 hidden md:table-cell">
                              <span className="inline-flex px-2 py-1 text-xs rounded-full bg-neutral-100 dark:bg-zinc-800">
                                {project.category}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-right text-emerald-600 dark:text-emerald-400 font-medium">{project.prize}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Children content */}
                {children && (
                  <div className="col-span-1 md:col-span-3 lg:col-span-4">
                    {children}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}