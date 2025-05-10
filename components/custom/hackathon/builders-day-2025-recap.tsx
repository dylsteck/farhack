'use client';
import React from 'react';
import { Trophy, Award, Medal, Star } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import FrameLink from '../frame/frame-link';
const styles = {
  gold: "text-yellow-500",
  silver: "text-gray-400",
  bronze: "text-amber-700",
  bgGold: "bg-yellow-500",
  bgSilver: "bg-gray-400",
  bgBronze: "bg-amber-700"
};
export default function BuildersDay2025Recap({ children }: { children?: React.ReactNode }) {
  const winners = [
    { position: 1, name: "AI or Not", creator: "@vmathur", prize: "$5,000", image: "/images/winners/team1.png" },
    { position: 2, name: "FC Trivia", creator: "@arek and @matthewfox", prize: "$3,000", image: "/images/winners/team2.png" },
    { position: 3, name: "Debbie Does Never Have I Ever", creator: "@debbie", prize: "$2,000", image: "/images/winners/team3.png" }
  ];
  const allProjects = [
    { name: "Talent Badges", team: "@chaps", teammates: "", prize: "", award: "", winner: false, link: "https://badges.miniapps.zone/" },
    { name: "Debbie Does Never Have I Ever", team: "@debbie", teammates: "", prize: "", award: "Third Place", winner: true, link: "https://debbiedoes.fun" },
    { name: "Homebase", team: "@rafi", teammates: "@luciano", prize: "", award: "", winner: false, link: "http://homebase.love" },
    { name: "Coinaroid", team: "@mcbain", teammates: "@alvesjtiago.eth @adrienne", prize: "", award: "Most Interoperable", winner: true, link: "https://coinaroid.xyz" },
    { name: "Ask Gina", team: "@sidshekhar", teammates: "ericjuta, cesar-askgina", prize: "", award: "", winner: false, link: "https://warpcast.com/sidshekhar/0x96cfb193" },
    { name: "AI or Not", team: "@vmathur", teammates: "", prize: "", award: "First Place", winner: true, link: "https://aiornot-six.vercel.app/" },
    { name: "Spoticast", team: "@frankk", teammates: "@limone.eth, @bianc8", prize: "", award: "", winner: false, link: "Spoticast" },
    { name: "GlitchCast", team: "@shaya", teammates: "", prize: "", award: "", winner: false, link: "https://glitch-cast-shayastark.replit.app" },
    { name: "Nounspace - Proposal Spaces", team: "@willywonka.eth", teammates: "@skateboard, @r4topunk, @realitycrafter.eth", prize: "", award: "", winner: false, link: "https://staging.nounspace.com/p/792" },
    { name: "ai adventure", team: "@weeb3dev", teammates: "", prize: "", award: "", winner: false, link: "https://aiadventure-beta.vercel.app" },
    { name: "Open Match", team: "@sdav", teammates: "", prize: "", award: "", winner: false, link: "https://oss-mini-app.vercel.app/projects" },
    { name: "bumps", team: "@metamonk", teammates: "", prize: "", award: "", winner: false, link: "https://bumps.wtf | https://github.com/metamonk/bumps" },
    { name: "Onchain Omaha", team: "@hurls", teammates: "@saltorious.eth, @garrett", prize: "", award: "", winner: false, link: "https://www.onchainomaha.fun" },
    { name: "Blockhead", team: "@darrylyeo", teammates: "", prize: "", award: "", winner: false, link: "https://blockhead.info" },
    { name: "FollowCast", team: "@jx", teammates: "@shaunc.eth, @pyyding, @marthendalnunes, musicben", prize: "", award: "", winner: false, link: "https://warpcast.com/miniapps/NyXJOZb7ywC5/followcast" },
    { name: "VibeHole", team: "@polak.eth", teammates: "@iamvico1 @brianethier @myk", prize: "", award: "", winner: false, link: "https://vibe-hole.vercel.app/" },
    { name: "FC Trivia", team: "@matthewfox", teammates: "@arek", prize: "", award: "Second Place", winner: true, link: "https://warpcast.com/miniapps/FpMpReyuwh7D/trivia" },
    { name: "DesignClub", team: "@quazia", teammates: "@veganbeef, @mcilroyc", prize: "", award: "", winner: false, link: "design-club-one.vercel.app" },
    { name: "farcode", team: "@jpfraneto.eth", teammates: "", prize: "", award: "", winner: false, link: "https://warpcast.com/jpfraneto.eth/0xb1389014" }
  ]; 

  const renderTeammates = (project: any) => {
    const allTeammates = [project.team, ...(project.teammates ? project.teammates.split(/,\s*|\s+/).filter(Boolean) : [])];
    
    return (
      <div className="flex flex-wrap gap-1">
        {allTeammates.map((teammate, idx) => {
          let handle = teammate.trim();
          if (handle.startsWith('@')) handle = handle.substring(1);
          
          return (
            <React.Fragment key={idx}>
              {idx > 0 && <span className="mr-1">,</span>}
              <span className="text-blue-600 dark:text-blue-400 hover:underline inline-block">
                <FrameLink 
                  identifier={`https://warpcast.com/${handle}`}
                  type="url"
                >
                  {teammate}
                </FrameLink>
              </span>
            </React.Fragment>
          );
        })}
      </div>
    );
  };

  return (
    <div className="w-full min-h-screen md:min-h-full">
      <div className="w-full h-full flex justify-center">
        <div className="rounded-none md:rounded-2xl w-full max-w-full lg:w-full min-h-screen md:min-h-full border border-transparent md:border-neutral-200 dark:md:border-white/10 bg-white dark:bg-black/40 dark:backdrop-blur-md mt-4 text-black dark:text-white overflow-x-hidden overflow-y-auto">
          <div className="w-full border-b border-neutral-200 dark:border-white/10">
            <div className="w-full m-1 mt-0 md:mt-3.5 pb-1"></div>
          </div>
          <div className="w-full py-8 px-2">
            <div className="max-w-full mx-auto">
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-10 text-center bg-gradient-to-r from-orange-500 to-purple-600 dark:from-orange-400 dark:to-purple-500 bg-clip-text text-transparent">Builders Day 2025 Recap</h1>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                <div className="md:col-span-1 lg:col-span-1 md:row-span-2 rounded-xl p-4 md:p-6 flex items-center justify-center">
                  <div className="w-full h-full max-w-xs mx-auto flex items-center justify-center">
                    <Image 
                      src="https://i.imgur.com/AWLzIaQ.png" 
                      alt="Builders Day 2025" 
                      className="w-full h-auto rounded-xl shadow-lg border-2 border-orange-500 dark:border-orange-600"
                      width={400}
                      height={300}
                    />
                  </div>
                </div>
                <div className="md:col-span-2 lg:col-span-3 rounded-xl p-4 md:p-6 flex items-center">
                  <div className="text-center md:text-left">
                    <p className="text-xl md:text-2xl text-black/80 dark:text-white/80 font-medium">Celebrating the incredible projects and teams that made Builders Day 2025 an unforgettable event</p>
                  </div>
                </div>
                <div className="md:col-span-2 lg:col-span-1 rounded-xl p-4 md:p-6 flex flex-col items-center justify-center border border-neutral-200 dark:border-neutral-800 backdrop-blur-sm">
                  <h3 className="text-5xl font-bold bg-gradient-to-r from-emerald-500 to-green-600 bg-clip-text text-transparent">39</h3>
                  <p className="text-neutral-700 dark:text-neutral-300 font-medium">Hackers</p>
                </div>
                <div className="md:col-span-2 lg:col-span-1 rounded-xl p-4 md:p-6 flex flex-col items-center justify-center border border-neutral-200 dark:border-neutral-800 backdrop-blur-sm">
                  <h3 className="text-5xl font-bold bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">20</h3>
                  <p className="text-neutral-700 dark:text-neutral-300 font-medium">Projects</p>
                </div>
                <div className="md:col-span-2 lg:col-span-1 rounded-xl p-4 md:p-6 flex flex-col items-center justify-center border border-neutral-200 dark:border-neutral-800 backdrop-blur-sm">
                  <h3 className="text-5xl font-bold bg-gradient-to-r from-amber-500 to-yellow-600 bg-clip-text text-transparent">$24,000</h3>
                  <p className="text-neutral-700 dark:text-neutral-300 font-medium">Total Prizes</p>
                </div>
                <div className="col-span-1 md:col-span-3 lg:col-span-4 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl p-4 md:p-6">
                  <h2 className="text-2xl font-semibold mb-8 text-center">
                    <Trophy className="inline-block mr-2 mb-1 animate-bounce" size={28} />
                    Grand Prize Winners
                  </h2>
                  <div className="relative flex flex-col md:flex-row justify-center items-end gap-4 md:gap-8 h-auto md:h-[300px] mb-8 mt-16">
                    <div className="order-2 md:order-1 w-full md:w-1/3 h-auto pb-6 md:h-[220px] bg-gradient-to-b from-neutral-100 to-neutral-200 dark:from-zinc-800 dark:to-zinc-900 rounded-t-lg border border-neutral-300 dark:border-zinc-700 shadow-lg relative mb-14 md:mb-0 transition-transform duration-300 hover:scale-105">
                      <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
                        <div className="bg-neutral-100 dark:bg-zinc-800 size-24 rounded-full flex items-center justify-center border-2 border-neutral-300 dark:border-zinc-700">
                          <Medal size={40} className={styles.silver} />
                        </div>
                        <div className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 ${styles.bgSilver} text-white font-bold rounded-full size-8 flex items-center justify-center`}>2</div>
                      </div>
                      <div className="p-6 pt-16 text-center">
                        <div className="font-bold text-xl no-underline">
                          <FrameLink 
                            identifier={allProjects.find(p => p.award === "Second Place")?.link || "#"} 
                            type="url"
                          >
                            {winners[1].name}
                          </FrameLink>
                        </div>
                        <p className="text-neutral-700 dark:text-neutral-300 font-medium">
                          {winners[1].creator.split(" and ").map((creator, idx) => (
                            <React.Fragment key={idx}>
                              {idx > 0 && " and "}
                              <span className="no-underline text-neutral-700 dark:text-neutral-300 inline">
                                <FrameLink 
                                  identifier={`https://warpcast.com/${creator.startsWith('@') ? creator.substring(1) : creator}`} 
                                  type="url"
                                >
                                  {creator}
                                </FrameLink>
                              </span>
                            </React.Fragment>
                          ))}
                        </p>
                        <p className="text-emerald-600 dark:text-emerald-400 font-bold text-xl mt-2">{winners[1].prize}</p>
                      </div>
                    </div>
                    <div className="order-1 md:order-2 w-full md:w-1/3 h-auto pb-6 md:h-[260px] bg-gradient-to-b from-amber-50 to-amber-100 dark:from-amber-900/30 dark:to-amber-800/20 rounded-t-lg border border-amber-200 dark:border-amber-700/50 shadow-xl relative mb-14 md:mb-0 transition-transform duration-300 hover:scale-105">
                      <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
                        <div className="bg-amber-50 dark:bg-amber-900/30 size-24 rounded-full flex items-center justify-center border-2 border-amber-200 dark:border-amber-700/50">
                          <Trophy size={40} className={styles.gold} />
                        </div>
                        <div className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 ${styles.bgGold} text-white font-bold rounded-full size-8 flex items-center justify-center`}>1</div>
                      </div>
                      <div className="p-6 pt-16 text-center">
                        <div className="font-bold text-xl no-underline">
                          <FrameLink 
                            identifier={allProjects.find(p => p.award === "First Place")?.link || "#"} 
                            type="url"
                          >
                            {winners[0].name}
                          </FrameLink>
                        </div>
                        <p className="text-neutral-700 dark:text-neutral-300 font-medium">
                          <span className="no-underline text-neutral-700 dark:text-neutral-300 inline">
                            <FrameLink 
                              identifier={`https://warpcast.com/${winners[0].creator.startsWith('@') ? winners[0].creator.substring(1) : winners[0].creator}`} 
                              type="url"
                            >
                              {winners[0].creator}
                            </FrameLink>
                          </span>
                        </p>
                        <p className="text-emerald-600 dark:text-emerald-400 font-bold text-xl mt-2">{winners[0].prize}</p>
                      </div>
                    </div>
                    <div className="order-3 w-full md:w-1/3 h-auto pb-6 md:h-[180px] bg-gradient-to-b from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/10 rounded-t-lg border border-orange-200 dark:border-orange-800/30 shadow-lg relative mb-14 md:mb-0 transition-transform duration-300 hover:scale-105">
                      <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
                        <div className="bg-orange-50 dark:bg-orange-900/20 size-24 rounded-full flex items-center justify-center border-2 border-orange-200 dark:border-orange-800/30">
                          <Award size={40} className={styles.bronze} />
                        </div>
                        <div className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 ${styles.bgBronze} text-white font-bold rounded-full size-8 flex items-center justify-center`}>3</div>
                      </div>
                      <div className="p-6 pt-16 text-center">
                        <div className="font-bold text-xl no-underline">
                          <FrameLink 
                            identifier={allProjects.find(p => p.award === "Third Place")?.link || "#"} 
                            type="url"
                          >
                            {winners[2].name}
                          </FrameLink>
                        </div>
                        <p className="text-neutral-700 dark:text-neutral-300 font-medium">
                          <span className="no-underline text-neutral-700 dark:text-neutral-300 inline">
                            <FrameLink 
                              identifier={`https://warpcast.com/${winners[2].creator.startsWith('@') ? winners[2].creator.substring(1) : winners[2].creator}`} 
                              type="url"
                            >
                              {winners[2].creator}
                            </FrameLink>
                          </span>
                        </p>
                        <p className="text-emerald-600 dark:text-emerald-400 font-bold text-xl mt-2">{winners[2].prize}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-span-1 md:col-span-3 lg:col-span-4 bg-white dark:bg-zinc-900/40 rounded-xl p-4 md:p-6">
                  <h2 className="text-2xl font-semibold mb-6 text-center">All Projects</h2>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b border-neutral-200 dark:border-neutral-700">
                          <th className="px-4 py-3 text-left font-semibold">Project</th>
                          <th className="px-4 py-3 text-left font-semibold">Teammates</th>
                          <th className="px-4 py-3 text-right font-semibold">Award</th>
                        </tr>
                      </thead>
                      <tbody>
                        {allProjects.map((project, index) => (
                          <tr key={index} className="border-b border-neutral-100 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-zinc-800/50 transition-colors">
                            <td className="px-4 py-3 font-medium">
                              <div className="hover:text-blue-600 dark:hover:text-blue-400 hover:underline">
                                <FrameLink 
                                  identifier={project.link} 
                                  type="url" 
                                >
                                  {project.name}
                                </FrameLink>
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              {renderTeammates(project)}
                            </td>
                            <td className="px-4 py-3 text-right">
                              {project.award ? (
                                <div className="inline-flex items-center justify-end px-3 py-1.5 rounded-full bg-gradient-to-r from-neutral-100/80 to-neutral-200/80 dark:from-zinc-800/80 dark:to-zinc-700/80 shadow-sm">
                                  {project.award === "First Place" && <Trophy size={18} className={`${styles.gold} mr-2`} />}
                                  {project.award === "Second Place" && <Medal size={18} className={`${styles.silver} mr-2`} />}
                                  {project.award === "Third Place" && <Award size={18} className={`${styles.bronze} mr-2`} />}
                                  {project.award === "Most Interoperable" && <Star size={18} className="text-blue-500 mr-2" />}
                                  <span className="font-medium">
                                    {project.award}
                                  </span>
                                </div>
                              ) : null}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                {children && <div className="col-span-1 md:col-span-3 lg:col-span-4">{children}</div>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}