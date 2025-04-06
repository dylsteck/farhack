'use client';

import React, { useState } from 'react';
import { Hackathon, Team } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { toast } from 'sonner';
import { farhackSDK } from '@/lib/api';
import { useRouter } from 'next/navigation';

interface Embed {
  url: string;
  type: 'url' | 'image';
}

interface ExtendedTeam extends Team {
  embeds: Embed[];
  submitted_at: Date | null;
  wallet_address: string;
}

export default function YourTeam({ user, hackathon }: { user: any, hackathon: Hackathon }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [team, setTeam] = useState<ExtendedTeam | null>(null);
  const [embedType, setEmbedType] = useState<'url' | 'image'>('url');
  const [embedUrl, setEmbedUrl] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [showDeadlineDate, setShowDeadlineDate] = useState(false);

  const router = useRouter();
  const userId = user?.id ? Number(user.id) : undefined;
  const teams = (hackathon as any).teams || [];
  const userTeam = teams.find((team: any) => team.fids.some((member: any) => member.id === userId));

  const openDialog = (editing: boolean) => {
    if (editing && userTeam) {
      setTeam({ ...userTeam, submitted_at: userTeam.submitted_at || null, wallet_address: userTeam.wallet_address || '' });
      setWalletAddress(userTeam.wallet_address || '');
    } else {
      setTeam({
        id: 0,
        name: '',
        description: '',
        hackathon_id: hackathon.id,
        embeds: [],
        fids: [],
        submitted_at: null,
        wallet_address: '',
      });
      setWalletAddress('');
    }
    setIsDialogOpen(true);
  };

  const openDeleteDialog = () => {
    setIsDeleteDialogOpen(true);
  };

  const handleSave = async () => {
    try {
      if (!team) return;
      if (team.id === 0) {
        await farhackSDK.createTeam(team.name, team.description, hackathon.id, userId ?? -1);
        toast.success('Team created successfully!');
      } else {
        await farhackSDK.updateTeam(team.id, { name: team.name, description: team.description, embeds: team.embeds, wallet_address: walletAddress });
        toast.success('Team updated successfully!');
      }
      router.refresh();
      setIsDialogOpen(false);
    } catch (error) {
      toast.error(`Error: ${(error as Error).message}`);
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

  const handleGenerateInvite = async () => {
    if (!userTeam) return;
    try {
      const token = await farhackSDK.createInvite(hackathon.slug, userId ?? -1, userTeam.id);
      const inviteLink = `${window.location.origin}/hackathons/${hackathon.slug}/teams/accept-invite?token=${token}`;
      navigator.clipboard.writeText(inviteLink);
      toast.success('Invite link copied to clipboard! Share it with your teammate.');
    } catch (error) {
      toast.error(`Error generating invite: ${(error as Error).message}`);
    }
  };

  const addEmbed = () => {
    if (!embedUrl.trim()) return;
    setTeam((prev) => prev ? { ...prev, embeds: [...prev.embeds, { url: embedUrl, type: embedType }] } : prev);
    setEmbedUrl('');
  };

  const deadline = hackathon.end_date ? new Date(hackathon.end_date) : null;
  const isClosed = deadline ? deadline.getTime() < Date.now() : false;
  const timeLeft = deadline ? Math.max(deadline.getTime() - Date.now(), 0) : 0;
  const readableTimeLeft = timeLeft > 0 ? `${Math.floor(timeLeft / (1000 * 60 * 60))}h ${Math.floor((timeLeft / (1000 * 60)) % 60)}m` : 'Closed';

  return (
    <div className="bg-transparent text-black dark:text-white">
      <div className="container mx-auto py-6 px-4 md:px-6 max-w-7xl">
        <h2 className="text-3xl font-bold mb-2">Your Team</h2>
        <div className="text-sm text-zinc-400 cursor-pointer my-6">
          <div className="text-md">Deadline</div>
          <div className="text-lg font-medium" onClick={() => setShowDeadlineDate(!showDeadlineDate)}>
            {deadline ? (
              showDeadlineDate ? deadline.toLocaleString() : (isClosed ? 'Closed' : readableTimeLeft)
            ) : 'TBD'}
          </div>
        </div>

        {userTeam ? (
          <div className="mt-4 border border-zinc-700 rounded-2xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-semibold">{userTeam.name}</h3>
              <div className="flex gap-2">
                <Button className="bg-white text-black px-4 py-2" onClick={() => openDialog(true)}>Edit</Button>
                <Button className="bg-green-500 hover:bg-green-600 px-4 py-2" onClick={handleGenerateInvite}>Invite</Button>
              </div>
            </div>
            <p className="text-zinc-300">{userTeam.description}</p>
          </div>
        ) : (
          <div className="mt-4">
            <p className="text-zinc-400">You are not part of any team</p>
            {!isClosed && (
              <Button className="mt-4 px-6 py-3 text-lg bg-white text-black" onClick={() => openDialog(false)}>Create Team</Button>
            )}
          </div>
        )}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{team?.id === 0 ? 'Create a Team' : 'Edit Team'}</DialogTitle>
          </DialogHeader>
          <Input placeholder="Team Name" value={team?.name || ''} onChange={(e) => setTeam((prev) => prev ? { ...prev, name: e.target.value } : prev)} className="mb-4" />
          <Textarea placeholder="Team Description" value={team?.description || ''} onChange={(e) => setTeam((prev) => prev ? { ...prev, description: e.target.value } : prev)} className="mb-4" />
          <div>
            <h3 className="text-lg font-medium">Embeds</h3>
            <div className="flex gap-2 mt-2">
              <Input placeholder="Embed URL" value={embedUrl} onChange={(e) => setEmbedUrl(e.target.value)} className="flex-1" />
              <Select value={embedType} onValueChange={(value: 'url' | 'image') => setEmbedType(value)}>
                <SelectTrigger className="w-20"><SelectValue placeholder="Type" /></SelectTrigger>
                <SelectContent><SelectItem value="url">URL</SelectItem><SelectItem value="image">Image</SelectItem></SelectContent>
              </Select>
              <Button onClick={addEmbed} className="bg-green-500 hover:bg-green-600">Add</Button>
            </div>
          </div>
          <DialogFooter className="mt-6">
            <Button onClick={handleSave}>Save</Button>
            <Button onClick={() => setIsConfirmDialogOpen(true)}>Submit</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}