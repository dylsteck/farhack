'use client';

import React, { useState } from 'react';
import { FullHackathon, Team, Embed } from '@/lib/types';
import { Users, ExternalLink, Search, LayoutGrid, List, PackageOpen } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Image from 'next/image';
import Link from 'next/link';

export default function Teams({ hackathon }: { hackathon: FullHackathon }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const { slug, teams } = hackathon;

  const truncateText = (text: string, maxLength: number) =>
    text.length > maxLength ? text.slice(0, maxLength) + '...' : text;

  const extractLinks = (text: string): string[] => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.match(urlRegex) || [];
  };

  const cleanText = (text: string) =>
    text.replace(/(https?:\/\/[^\s]+)/g, '').trim();

  const filteredTeams = teams
    ? teams.filter(
        (team) =>
          team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (team.description && team.description.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : [];

  return (
    <div className="bg-inherit text-inherit">
      <div className="container mx-auto py-6 px-4 md:px-6 max-w-7xl">
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <h2 className="text-2xl font-semibold">Teams</h2>

            {slug !== 'builders-day-at-farcon-2025' && (
              <div className="flex items-center gap-3 w-full md:w-auto">
                <div className="relative w-full md:w-64">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500" />
                  <Input
                    type="text"
                    placeholder="Search teams..."
                    className="pl-9 bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-500 focus-visible:ring-zinc-700"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <ToggleGroup type="single" value={viewMode} onValueChange={(value) => value && setViewMode(value as 'grid' | 'list')}>
                  <ToggleGroupItem value="grid" size="sm" className="data-[state=on]:bg-zinc-800">
                    <LayoutGrid className="h-4 w-4" />
                  </ToggleGroupItem>
                  <ToggleGroupItem value="list" size="sm" className="data-[state=on]:bg-zinc-800">
                    <List className="h-4 w-4" />
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>
            )}
          </div>

          {slug === 'builders-day-at-farcon-2025' ? (
            <div className="flex items-center justify-center gap-2 text-zinc-400">
              <PackageOpen className="h-5 w-5" />
              <p>Coming soon!</p>
            </div>
          ) : teams && teams.length > 0 ? (
            <>
              {filteredTeams.length > 0 ? (
                viewMode === 'grid' ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredTeams.map((team: Team) => (
                      <Dialog key={team.id}>
                        <DialogTrigger asChild>
                          <Card className="bg-zinc-900 border-zinc-800 overflow-hidden hover:border-zinc-700 transition-all cursor-pointer">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 border-b border-zinc-800">
                              <CardTitle className="text-lg font-semibold text-white">{team.name}</CardTitle>
                              <Users className="h-5 w-5 text-amber-500" />
                            </CardHeader>
                            <CardContent className="pt-4">
                              <CardDescription className="text-zinc-400 text-sm">
                                {truncateText(cleanText(team.description), 100)}
                              </CardDescription>
                            </CardContent>
                          </Card>
                        </DialogTrigger>
                        <DialogContent className="bg-zinc-900 border border-zinc-800 text-white p-6 rounded-xl max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle className="text-2xl font-bold">{team.name}</DialogTitle>
                          </DialogHeader>
                          <div className="mt-4 space-y-4">
                            <p className="text-zinc-300 whitespace-pre-line">{cleanText(team.description)}</p>
                            {extractLinks(team.description).map((link, index) => (
                              <div key={index} className="mt-2">
                                <a href={link} target="_blank" rel="noopener noreferrer" className="text-amber-500 underline flex items-center">
                                  {link} <ExternalLink className="ml-2 h-4 w-4" />
                                </a>
                              </div>
                            ))}
                            {team.embeds &&
                              team.embeds.map((embed: Embed, index: number) => (
                                <div key={index} className="mt-4">
                                  {embed.type === 'image' ? (
                                    <Image
                                      src={embed.url}
                                      alt="Embedded Image"
                                      width={600}
                                      height={400}
                                      className="rounded-lg border border-zinc-700 object-cover"
                                    />
                                  ) : (
                                    <a href={embed.url} target="_blank" rel="noopener noreferrer" className="text-amber-500 underline flex items-center">
                                      {embed.url} <ExternalLink className="ml-2 h-4 w-4" />
                                    </a>
                                  )}
                                </div>
                              ))}
                            <div className="mt-6">
                              <h3 className="text-lg font-medium">Team Members</h3>
                              <div className="flex flex-wrap gap-4 mt-2">
                                {team.fids.map((fid: number) => (
                                  <a
                                    key={fid}
                                    href={`https://warpcast.com/${fid}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 text-amber-500 hover:underline"
                                  >
                                    <span className="font-medium">@{fid}</span>
                                  </a>
                                ))}
                              </div>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredTeams.map((team: Team) => (
                      <Dialog key={team.id}>
                        <DialogTrigger asChild>
                          <Card className="bg-zinc-900 border-zinc-800 overflow-hidden hover:border-zinc-700 transition-all cursor-pointer flex items-center p-4">
                            <div className="flex-1">
                              <CardTitle className="text-lg font-semibold text-white">{team.name}</CardTitle>
                              <CardDescription className="text-zinc-400 text-sm mt-1">
                                {truncateText(cleanText(team.description), 150)}
                              </CardDescription>
                            </div>
                            <Users className="h-5 w-5 text-amber-500 ml-4" />
                          </Card>
                        </DialogTrigger>
                         <DialogContent className="bg-zinc-900 border border-zinc-800 text-white p-6 rounded-xl max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle className="text-2xl font-bold">{team.name}</DialogTitle>
                          </DialogHeader>
                          <div className="mt-4 space-y-4">
                            <p className="text-zinc-300 whitespace-pre-line">{cleanText(team.description)}</p>
                            {extractLinks(team.description).map((link, index) => (
                              <div key={index} className="mt-2">
                                <a href={link} target="_blank" rel="noopener noreferrer" className="text-amber-500 underline flex items-center">
                                  {link} <ExternalLink className="ml-2 h-4 w-4" />
                                </a>
                              </div>
                            ))}
                            {team.embeds &&
                              team.embeds.map((embed: Embed, index: number) => (
                                <div key={index} className="mt-4">
                                  {embed.type === 'image' ? (
                                    <Image
                                      src={embed.url}
                                      alt="Embedded Image"
                                      width={600}
                                      height={400}
                                      className="rounded-lg border border-zinc-700 object-cover"
                                    />
                                  ) : (
                                    <a href={embed.url} target="_blank" rel="noopener noreferrer" className="text-amber-500 underline flex items-center">
                                      {embed.url} <ExternalLink className="ml-2 h-4 w-4" />
                                    </a>
                                  )}
                                </div>
                              ))}
                            <div className="mt-6">
                              <h3 className="text-lg font-medium">Team Members</h3>
                              <div className="flex flex-wrap gap-4 mt-2">
                                {team.fids.map((fid: number) => (
                                  <a
                                    key={fid}
                                    href={`https://warpcast.com/${fid}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 text-amber-500 hover:underline"
                                  >
                                    <span className="font-medium">@{fid}</span>
                                  </a>
                                ))}
                              </div>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    ))}
                  </div>
                )
              ) : (
                <div className="flex items-center justify-center gap-2 text-zinc-400">
                  <PackageOpen className="h-5 w-5" />
                  <p>No teams found matching your search.</p>
                </div>
              )}
            </>
          ) : (
            <div className="flex items-center justify-center gap-2 text-zinc-400">
              <Users className="h-5 w-5" />
              <p>No teams available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}