'use client';

import React, { useState } from 'react';
import { HackathonNav } from '@/components/custom/hackathon-nav';
import { Hackathon } from '@/app/lib/types';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { User } from 'next-auth';

export default function YourTeam({ user, hackathon }: { user: User | undefined, hackathon: Hackathon }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [teamName, setTeamName] = useState('');

  const userId = user?.id;
  const teams = (hackathon as any).teams || [];
  const userTeam = teams.find((team: any) => team.fids.includes(userId));

  const handleCreateTeam = () => {};

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto py-1 px-4 md:px-6 max-w-7xl">
        <div className="flex flex-col space-y-1 m-0">
          <HackathonNav hackathon={hackathon} />
        </div>

        <div className="mt-10 text-left">
          <p className="text-zinc-400">
            Time to submission deadline: {hackathon.end_date ? new Date(hackathon.end_date).toLocaleString() : 'TBD'}
          </p>

          {userTeam ? (
            <div className="mt-4">
              <p>You are part of <span className="font-semibold">{userTeam.name}</span></p>
            </div>
          ) : (
            <div className="mt-4">
              <p className="text-zinc-400">You are not part of any team</p>
              <Button className="mt-4 px-6 py-3 text-lg" onClick={() => setIsDialogOpen(true)}>Create Team</Button>
            </div>
          )}
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create a Team</DialogTitle>
            <DialogDescription>Enter a name for your new team.</DialogDescription>
          </DialogHeader>
          <Input
            placeholder="Team Name"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
          />
          <DialogFooter>
            <Button onClick={handleCreateTeam}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}