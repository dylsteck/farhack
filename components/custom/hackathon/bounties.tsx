'use client';

import React, { useState } from 'react';
import { HackathonNav } from '@/components/custom/hackathon-nav';
import { Hackathon, Bounty } from '@/app/lib/types';
import { Trophy, ExternalLink, Search, LayoutGrid, List } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

export default function Bounties({ hackathon }: { hackathon: Hackathon }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  const startDate = new Date(hackathon.start_date).toLocaleDateString(undefined, { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
  
  const endDate = new Date(hackathon.end_date).toLocaleDateString(undefined, { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
  
  const bounties = hackathon.bounties;
  
  const filteredBounties = bounties ? bounties.filter(bounty => 
    bounty.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (bounty.description && bounty.description.toLowerCase().includes(searchQuery.toLowerCase()))
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
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto py-6 px-4 md:px-6 max-w-7xl">
        <div className="flex flex-col space-y-2 mb-8">
          <HackathonNav hackathon={hackathon} />
        </div>
        
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="text-2xl font-semibold">Bounties</h2>
            </div>
      
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500" />
                <Input
                  type="text"
                  placeholder="Search bounties..."
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

          {bounties && bounties.length > 0 ? (
            <>
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredBounties.map((bounty) => (
                    <Card key={bounty.id} className="bg-zinc-900 border-zinc-800 overflow-hidden hover:border-zinc-700 transition-all">
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 border-b border-zinc-800">
                        <CardTitle className="text-lg font-semibold text-white">{bounty.name}</CardTitle>
                        <Trophy className="h-5 w-5 text-amber-500" />
                      </CardHeader>
                      <CardContent className="pt-4">
                        <CardDescription className="text-zinc-400 text-sm">
                          {cleanDescription(bounty.description)}
                        </CardDescription>
                      </CardContent>
                      {extractUrl(bounty.description) && (
                        <CardFooter className="pt-0">
                          <Button variant="outline" size="sm" className="w-full bg-zinc-800 border-zinc-700 hover:bg-zinc-700 text-zinc-300" asChild>
                            <a href={extractUrl(bounty.description)} target="_blank" rel="noopener noreferrer">
                              Learn More <ExternalLink className="ml-2 h-4 w-4" />
                            </a>
                          </Button>
                        </CardFooter>
                      )}
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredBounties.map((bounty) => (
                    <Card key={bounty.id} className="bg-zinc-900 border-zinc-800 hover:border-zinc-700 transition-all">
                      <CardContent className="p-0">
                        <div className="flex flex-col md:flex-row gap-4 p-4">
                          <div className="flex items-center justify-center bg-zinc-800 rounded-md p-4 h-16 w-16">
                            <Trophy className="h-8 w-8 text-amber-500" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-white">{bounty.name}</h3>
                            <p className="text-zinc-400 text-sm mt-1">
                              {cleanDescription(bounty.description)}
                            </p>
                            {extractUrl(bounty.description) && (
                              <div className="mt-3">
                                <Button variant="outline" size="sm" className="bg-zinc-800 border-zinc-700 hover:bg-zinc-700 text-zinc-300" asChild>
                                  <a href={extractUrl(bounty.description)} target="_blank" rel="noopener noreferrer">
                                    Learn More <ExternalLink className="ml-2 h-4 w-4" />
                                  </a>
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
              
              {filteredBounties.length === 0 && (
                <div className="flex flex-col items-center justify-center py-12 px-4 bg-zinc-900 rounded-lg border border-zinc-800">
                  <Search className="h-12 w-12 text-zinc-700 mb-4" />
                  <h3 className="text-xl font-medium text-white text-center">No matching bounties</h3>
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
              <h3 className="text-xl font-medium text-white text-center">No Bounties Available</h3>
              <p className="text-zinc-400 text-center mt-1">
                Check back soon for new bounty challenges
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}