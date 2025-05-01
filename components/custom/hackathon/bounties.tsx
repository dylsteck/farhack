/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState } from 'react';
import { Hackathon, Bounty } from '@/lib/types';
import { ExternalLink, Search, LayoutGrid, List, PackageX } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import Link from 'next/link';
import { formatCurrency } from '@/lib/utils';

export default function Bounties({ hackathon }: { hackathon: Hackathon }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
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
    <div>
      <div className="container mx-auto py-6 px-4 md:px-6 max-w-7xl">
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="text-2xl font-semibold">Bounties</h2>
            </div>
      
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search bounties..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <ToggleGroup type="single" value={viewMode} onValueChange={(value: 'grid' | 'list') => value && setViewMode(value)}>
                <ToggleGroupItem value="grid" size="sm">
                  <LayoutGrid className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="list" size="sm">
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
                    <Card key={`bounty-${bounty.name}`} className="overflow-hidden transition-all flex flex-col">
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 border-b">
                        <div className="flex items-center gap-3">
                          {bounty.image ? (
                            <img 
                              src={bounty.image} 
                              alt={`${bounty.name} logo`}
                              className="h-8 w-8 rounded-md object-cover flex-shrink-0"
                            />
                          ) : (
                            <div className="h-8 w-8 rounded-md bg-muted flex-shrink-0"></div>
                          )}
                          <CardTitle className="text-lg font-semibold">{bounty.name}</CardTitle>
                        </div>
                        {bounty.amount && (
                          <span className="text-amber-500 font-semibold flex-shrink-0">{formatCurrency(bounty.amount.value)}</span>
                        )}
                      </CardHeader>
                      <CardContent className="pt-4 flex-grow">
                        <CardDescription>
                          {cleanDescription(bounty.description)}
                        </CardDescription>
                      </CardContent>
                      {extractUrl(bounty.description) && (
                        <CardFooter className="pt-0 mt-auto">
                          <Button variant="outline" size="sm" className="w-full" asChild>
                            <Link href={extractUrl(bounty.description)} target="_blank" rel="noopener noreferrer">
                              View Docs <ExternalLink className="ml-2 h-4 w-4" />
                            </Link>
                          </Button>
                        </CardFooter>
                      )}
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredBounties.map((bounty) => (
                    <Card key={bounty.id} className="transition-all">
                      <CardContent className="p-0">
                        <div className="flex flex-col md:flex-row items-center gap-4 p-4">
                          {bounty.image ? (
                            <img 
                              src={bounty.image} 
                              alt={`${bounty.name} logo`} 
                              className="h-16 w-16 rounded-full object-cover flex-shrink-0"
                            />
                          ) : (
                            <div className="h-16 w-16 rounded-full bg-muted flex-shrink-0"></div>
                          )}
                          <div className="flex-1 text-center md:text-left">
                            <h3 className="text-lg font-semibold">{bounty.name}</h3>
                            {bounty.amount && (
                              <p className="text-sm font-medium text-amber-500 mt-1">{formatCurrency(bounty.amount.value)}</p>
                            )}
                            <p className="text-muted-foreground text-sm mt-1">
                              {cleanDescription(bounty.description)}
                            </p>
                            {extractUrl(bounty.description) && (
                              <div className="mt-3">
                                <Button variant="outline" size="sm" asChild>
                                  <Link href={extractUrl(bounty.description)} target="_blank" rel="noopener noreferrer">
                                    View Docs <ExternalLink className="ml-2 h-4 w-4" />
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
              
              {filteredBounties.length === 0 && (
                <div className="flex flex-col items-center justify-center py-12 px-4 rounded-lg border">
                  <Search className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-xl font-medium text-center">No matching bounties</h3>
                  <p className="text-muted-foreground text-center mt-1">
                    Try adjusting your search query
                  </p>
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => setSearchQuery('')}
                  >
                    Clear search
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 px-4 rounded-lg border">
              <PackageX className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-xl font-medium text-center">No Bounties Available</h3>
              <p className="text-muted-foreground text-center mt-1">
                Check back soon for new bounty challenges
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}