'use client';

import React, { useState } from 'react';
import { HackathonNav } from '@/components/custom/hackathon-nav';
import { Hackathon, Team } from '@/app/lib/types';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { toast } from 'sonner';
import { farhackSDK } from '@/app/lib/api';
import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';

interface Embed {
  url: string;
  type: 'url' | 'image';
}

interface ExtendedTeam extends Team {
  embeds: Embed[];
}

export default function YourTeam({ user, hackathon }: { user: any, hackathon: Hackathon }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [team, setTeam] = useState<ExtendedTeam | null>(null);
  const [embedType, setEmbedType] = useState<'url' | 'image'>('url');
  const [embedUrl, setEmbedUrl] = useState('');

  const router = useRouter();
  const userId = user?.id ? Number(user.id) : undefined;
  const teams = (hackathon as any).teams || [];
  const userTeam = teams.find((team: any) => team.fids.some((member: any) => member.id === userId));

  const [walletAddress, setWalletAddress] = useState(userTeam?.wallet_address || '');

  const openDialog = () => {
    setTeam(userTeam ? { ...userTeam } : { id: 0, name: '', description: '', hackathon_id: hackathon.id, embeds: [], fids: [] });
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    try {
      if (!team) return;
      await farhackSDK.updateTeam(team.id, { name: team.name, description: team.description, embeds: team.embeds, wallet_address: walletAddress });
      toast.success('Team updated successfully!');
      router.refresh();
      setIsDialogOpen(false);
    } catch (error) {
      toast.error(`Error updating team: ${(error as Error).message}`);
    }
  };

  const handleSubmit = async () => {
    if (!team) return;
    try {
      await farhackSDK.updateTeam(team.id, { submitted_at: new Date() });
      router.refresh();
      toast.success('Team submitted successfully!');
      setIsDialogOpen(false);
      setIsConfirmDialogOpen(false);
    } catch (error) {
      toast.error(`Error submitting team: ${(error as Error).message}`);
    }
  };

  const addEmbed = () => {
    if (!embedUrl.trim()) return;
    setTeam((prev) => prev ? { ...prev, embeds: [...prev.embeds, { url: embedUrl, type: embedType }] } : prev);
    setEmbedUrl('');
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto py-6 px-4 md:px-6 max-w-7xl">
        <div className="flex flex-col space-y-2 mb-8">
          <HackathonNav hackathon={hackathon} />
        </div>

        <div className="mt-10 text-left">
          <p className="text-zinc-400">
            Time to submission deadline: {hackathon.end_date ? new Date(hackathon.end_date).toLocaleString() : 'TBD'}
          </p>

          {userTeam ? (
            <div className="mt-4">
              <p>You are part of <span className="font-semibold">{userTeam.name}</span></p>
              <p className="text-2xl font-medium mt-5">Actions</p>
              <Button className="mt-4 px-6 py-3 text-lg bg-white" onClick={openDialog}>View/Edit Team</Button>
            </div>
          ) : (
            <div className="mt-4">
              <p className="text-zinc-400">You are not part of any team</p>
              <p className="text-2xl font-medium mt-5">Actions</p>
              <Button className="mt-4 px-6 py-3 text-lg bg-white" onClick={openDialog}>Create Team</Button>
            </div>
          )}
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-h-[80vh] overflow-y-auto bg-zinc-900 border border-zinc-800 text-white p-6 rounded-xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">{userTeam ? 'Edit Team' : 'Create a Team'}</DialogTitle>
            <DialogDescription>Modify your team details below.</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <Input
              placeholder="Team Name"
              value={team?.name || ''}
              onChange={(e) => setTeam((prev) => prev ? { ...prev, name: e.target.value } : prev)}
            />
            <Textarea
              placeholder="Team Description"
              value={team?.description || ''}
              onChange={(e) => setTeam((prev) => prev ? { ...prev, description: e.target.value } : prev)}
            />

            <div>
              <h3 className="text-lg font-medium">Embeds</h3>
              <div className="flex gap-2 mt-2">
                <Input
                  placeholder="Embed URL"
                  value={embedUrl}
                  onChange={(e) => setEmbedUrl(e.target.value)}
                />
                <Select value={embedType} onValueChange={(value: 'url' | 'image') => setEmbedType(value)}>
                  <SelectTrigger className="w-20">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="url">URL</SelectItem>
                    <SelectItem value="image">Image</SelectItem>
                  </SelectContent>
                </Select>
                <Button onClick={addEmbed} className="bg-green-500 hover:bg-green-600">Add</Button>
              </div>
              {team && team?.embeds.length > 0 && (
                <ul className="mt-2 space-y-2">
                  {team.embeds.map((embed: Embed, index: number) => (
                    <li key={index} className="flex items-center justify-between bg-zinc-800 p-2 rounded-md">
                      <span className="truncate">{embed.url}</span>
                      <span className="ml-2 text-xs px-2 py-1 bg-zinc-700 rounded-md">{embed.type}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <Input
              placeholder="Wallet Address"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
            />
          </div>

          <DialogFooter className="flex justify-between mt-4 gap-2">
            <Button onClick={handleSave} className="bg-white">Save</Button>
            <Button onClick={() => setIsConfirmDialogOpen(true)} className="bg-white">
              Submit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
        <DialogContent className="bg-zinc-900 border border-zinc-800 text-white p-6 rounded-xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Confirm Submission</DialogTitle>
            <DialogDescription>Are you sure you want to submit your team? This action cannot be undone.</DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-end mt-4 gap-2">
            <Button onClick={() => setIsConfirmDialogOpen(false)} className="bg-zinc-700">Cancel</Button>
            <Button onClick={handleSubmit} className="bg-white">
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}