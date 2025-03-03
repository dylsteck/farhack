'use client';

import React, { useState } from 'react';
import { HackathonNav } from '@/components/custom/hackathon-nav';
import { Hackathon, Team } from '@/app/lib/types';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { farhackSDK } from '@/app/lib/api';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

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
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [creatingTeam, setCreatingTeam] = useState(false);
  const [team, setTeam] = useState<ExtendedTeam | null>(null);
  const [inviteToken, setInviteToken] = useState('');

  const router = useRouter();
  const userId = user?.id ? Number(user.id) : undefined;
  const teams = (hackathon as any).teams || [];
  const userTeam = teams.find((team: any) => team.fids.some((member: any) => member.id === userId));

  const [walletAddress, setWalletAddress] = useState(userTeam?.wallet_address || '');

  const openDialog = (creating: boolean) => {
    setCreatingTeam(creating);
    setTeam(creating
      ? { id: 0, name: '', description: '', hackathon_id: hackathon.id, embeds: [], fids: [] }
      : userTeam ? { ...userTeam } : null
    );
    setIsDialogOpen(true);
  };

  const handleCreateTeam = async () => {
    if (!team || !userId) return;
    try {
      await farhackSDK.createTeam(team.name, team.description, hackathon.id, userId);
      toast.success('Team created successfully!');
      router.refresh();
      setIsDialogOpen(false);
    } catch (error) {
      toast.error(`Error creating team: ${(error as Error).message}`);
    }
  };

  const handleSave = async () => {
    if (!team) return;
    try {
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

  const handleGenerateInvite = async () => {
    if (!userTeam) return;
    try {
      const token = await farhackSDK.createInvite(hackathon.slug, userId ?? -1, userTeam.id);
      const inviteLink = `${window.location.origin}/hackathons/${hackathon.slug}/teams/accept-invite?token=${token}`;
      setInviteToken(token);
      navigator.clipboard.writeText(inviteLink);
      toast.success('Invite link copied to clipboard! Share it with your teammate.');
    } catch (error) {
      toast.error(`Error generating invite: ${(error as Error).message}`);
    }
  };

  const handleDeleteTeam = async () => {
    if (!userTeam) return;
    try {
      await farhackSDK.deleteTeam(userTeam.id);
      toast.success('Team deleted successfully!');
      router.refresh();
      setIsDeleteDialogOpen(false);
    } catch (error) {
      toast.error(`Error deleting team: ${(error as Error).message}`);
    }
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

              <p className="text-xl font-medium mt-5">Teammates</p>
              <div className="mt-2 space-y-2">
                {userTeam.fids.map((member: any) => (
                  <div key={member.id} className="flex items-center gap-3 bg-zinc-800 p-3 rounded-lg">
                    <Image src={member.image || '/default-avatar.png'} alt={member.name} width={40} height={40} className="rounded-full" />
                    <span className="text-lg">{member.name}</span>
                  </div>
                ))}
              </div>

              <p className="text-2xl font-medium mt-5">Actions</p>
              <div className="flex flex-col gap-2 items-start mt-3">
                <Button className="px-4 py-3 text-lg bg-white" onClick={() => openDialog(false)}>View/Edit Team</Button>
                <Button className="px-6 py-3 text-lg bg-green-500 hover:bg-green-600" onClick={handleGenerateInvite}>Invite Teammate</Button>
                <Button className="px-6 py-3 text-lg bg-red-500 hover:bg-red-600" onClick={() => setIsDeleteDialogOpen(true)}>Delete Team</Button>
              </div>
            </div>
          ) : (
            <div className="mt-4">
              <p className="text-zinc-400">You are not part of any team</p>
              <p className="text-2xl font-medium mt-5">Actions</p>
              <Button className="mt-4 px-6 py-3 text-lg bg-white" onClick={() => openDialog(true)}>Create Team</Button>
            </div>
          )}
        </div>
      </div>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="bg-zinc-900 border border-zinc-800 text-white p-6 rounded-xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Confirm Deletion</DialogTitle>
            <DialogDescription>Are you sure you want to delete your team? This action cannot be undone.</DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-end mt-4 gap-2">
            <Button onClick={() => setIsDeleteDialogOpen(false)} className="bg-zinc-700">Cancel</Button>
            <Button onClick={handleDeleteTeam} className="bg-red-500 hover:bg-red-600">Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}