'use client';

import React, { useState } from 'react';
import { Hackathon } from '@/lib/types';
import { Trophy, ExternalLink, Search, LayoutGrid, List } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import Link from 'next/link';

export default function Tracks({ hackathon }: { hackathon: Hackathon }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  const tracks = hackathon.tracks;
  
  const filteredTracks = tracks ? tracks.filter(track => 
    track.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (track.description && track.description.toLowerCase().includes(searchQuery.toLowerCase()))
  ) : [];

  const extractUrl = (description: string | undefined) => {
    if (!description) return '';
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const urlMatch = description.match(urlRegex);
    return urlMatch ? urlMatch[0] : '';
  };

  const cleanDescription = (description: string | undefined) => {
    if (!description) return '';
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return description.replace(urlRegex, '').replace("Learn more:", '').trim();
  };

  return (
    <div className="bg-inherit text-inherit">
      <div className="container mx-auto py-6 px-3 md:px-4 max-w-7xl">
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="text-2xl font-semibold">Tracks</h2>
            </div>
      
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500" />
                <Input
                  type="text"
                  placeholder="Search tracks..."
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
          </div>

          {tracks && tracks.length > 0 ? (
            <>
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredTracks.map((track) => (
                    <Card key={track.id} className="bg-zinc-900 border-zinc-800 overflow-hidden hover:border-zinc-700 transition-all">
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 border-b border-zinc-800">
                        <CardTitle className="text-lg font-semibold text-white">{track.name}</CardTitle>
                        <Trophy className="h-5 w-5 text-amber-500" />
                      </CardHeader>
                      <CardContent className="pt-4">
                        <CardDescription className="text-zinc-400 text-sm">
                          {cleanDescription(track.description)}
                        </CardDescription>
                      </CardContent>
                      {extractUrl(track.description) && (
                        <CardFooter className="pt-0">
                          <Button variant="outline" size="sm" className="w-full bg-zinc-800 border-zinc-700 hover:bg-zinc-700 text-zinc-300" asChild>
                            <Link href={extractUrl(track.description)} target="_blank" rel="noopener noreferrer">
                              Learn More <ExternalLink className="ml-2 h-4 w-4" />
                            </Link>
                          </Button>
                        </CardFooter>
                      )}
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredTracks.map((track) => (
                    <Card key={track.id} className="bg-zinc-900 border-zinc-800 hover:border-zinc-700 transition-all">
                      <CardContent className="p-0">
                        <div className="flex flex-col md:flex-row gap-4 p-4">
                          <div className="flex items-center justify-center bg-zinc-800 rounded-md p-4 h-16 w-16">
                            <Trophy className="h-8 w-8 text-amber-500" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-white">{track.name}</h3>
                            <p className="text-zinc-400 text-sm mt-1">
                              {cleanDescription(track.description)}
                            </p>
                            {extractUrl(track.description) && (
                              <div className="mt-3">
                                <Button variant="outline" size="sm" className="bg-zinc-800 border-zinc-700 hover:bg-zinc-700 text-zinc-300" asChild>
                                  <Link href={extractUrl(track.description)} target="_blank" rel="noopener noreferrer">
                                    Learn More <ExternalLink className="ml-2 h-4 w-4" />
                                  </Link>
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
              
              {filteredTracks.length === 0 && (
                <div className="flex flex-col items-center justify-center py-12 px-4 bg-zinc-900 rounded-lg border border-zinc-800">
                  <Search className="h-12 w-12 text-zinc-700 mb-4" />
                  <h3 className="text-xl font-medium text-white text-center">No matching tracks</h3>
                  <p className="text-zinc-400 text-center mt-1">
                    Try adjusting your search query
                  </p>
                  <Button 
                    variant="outline" 
                    className="mt-4 bg-zinc-800 border-zinc-700 hover:bg-zinc-700 text-zinc-300"
                    onClick={() => setSearchQuery('')}
                  >
                    Clear search
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 px-4 bg-zinc-900 rounded-lg border border-zinc-800">
              <Trophy className="h-16 w-16 text-zinc-700 mb-4" />
              <h3 className="text-xl font-medium text-white text-center">No Tracks Available</h3>
              <p className="text-zinc-400 text-center mt-1">
                Check back soon for more updates!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}