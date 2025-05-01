'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Hackathon, Team, NeynarUser } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { toast } from 'sonner';
import { farhackSDK } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { CalendarIcon, PlusCircleIcon, X, Plus, Trash2, Users, Clock, InfoIcon, Link2Icon, WalletIcon, AlertTriangleIcon } from 'lucide-react';
import Image from 'next/image';

interface Embed {
  url: string;
  type: 'url' | 'image';
}

interface ExtendedTeam extends Omit<Team, 'created_at'> {
  embeds: Embed[];
  submitted_at: Date | null;
  wallet_address: string;
  created_at?: Date;
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
  const [teamMembers, setTeamMembers] = useState<string[]>([]);
  const [newTeamMemberInput, setNewTeamMemberInput] = useState('');
  const [confirmText, setConfirmText] = useState('');
  
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
        created_at: new Date(),
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
      
      setIsDialogOpen(false);
      
      if (team.id === 0) {
        const optimisticTeam = {
          ...team,
          id: -1,
          created_at: new Date(),
        };
        
        router.refresh();
        
        const createdTeam = await farhackSDK.createTeam(team.name, team.description, hackathon.id, userId ?? -1);
        toast.success('Team created successfully!');
        
        router.refresh();
      } else {
        router.refresh();
        
        await farhackSDK.updateTeam(team.id, { 
          name: team.name, 
          description: team.description, 
          embeds: team.embeds,
          wallet_address: walletAddress 
        });
        
        toast.success('Team updated successfully!');
        
        router.refresh();
      }
    } catch (error) {
      setIsDialogOpen(true);
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
      setConfirmText('');
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

  const removeEmbed = (index: number) => {
    setTeam((prev) => 
      prev ? { ...prev, embeds: prev.embeds.filter((_, i) => i !== index) } : prev
    );
  };

  const addTeamMember = () => {
    const memberToAdd = newTeamMemberInput.trim();
    if (!memberToAdd) return;
    if (!teamMembers.includes(memberToAdd)) {
      setTeamMembers((prev) => [...prev, memberToAdd]);
    }
    setNewTeamMemberInput('');
  };

  const removeTeamMember = (index: number) => {
    setTeamMembers((prev) => prev.filter((_, i) => i !== index));
  };

  const deadline = hackathon.end_date ? new Date(hackathon.end_date) : null;
  const isClosed = deadline ? deadline.getTime() < Date.now() : false;
  const timeLeft = deadline ? Math.max(deadline.getTime() - Date.now(), 0) : 0;

  const getReadableTimeLeft = (ms: number) => {
    if (ms <= 0) return 'Closed';
    const days = Math.floor(ms / (1000 * 60 * 60 * 24));
    const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((ms / (1000 * 60)) % 60);

    const parts = [];
    if (days > 0) parts.push(`${days}d`);
    if (hours > 0 || days > 0) parts.push(`${hours}h`);
    parts.push(`${minutes}m`);
    return parts.join(' ');
  };

  const readableTimeLeft = getReadableTimeLeft(timeLeft);

  return (
    <div className="bg-transparent text-black dark:text-white">
      <div className="container mx-auto py-6 px-4 md:px-6 max-w-7xl">
        <h2 className="text-3xl font-bold mb-6">Your Team</h2>

        <div className="my-6 flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 border border-zinc-300 dark:border-zinc-700 rounded-xl px-4 py-3 h-14 cursor-pointer hover:bg-zinc-800/20 transition-colors" onClick={() => setShowDeadlineDate(!showDeadlineDate)}>
            <CalendarIcon className="w-5 h-5 text-zinc-500 dark:text-zinc-400" />
            <div className="text-sm text-zinc-600 dark:text-zinc-400">
              <div className="text-xs uppercase tracking-wide">Deadline</div>
              <div className="text-base font-semibold">
                {deadline ? (showDeadlineDate ? deadline.toLocaleString() : readableTimeLeft) : 'TBD'}
              </div>
            </div>
          </div>
        </div>

        {!userTeam && !isClosed && (
          <div className="mt-4">
            {hackathon.slug === 'builders-day-at-farcon-2025' ? (
              <div className="flex items-center gap-2 border border-neutral-300 dark:border-zinc-700 rounded-xl px-4 py-3 h-14 bg-neutral-100 dark:bg-zinc-900/50 text-neutral-700 dark:text-zinc-400 text-sm">
                <InfoIcon className="w-5 h-5 text-neutral-500 dark:text-zinc-500" />
                Create team will be available to attendees when the hackathon starts on May 1st.
              </div>
            ) : (
              <div
                onClick={() => openDialog(false)}
                className="inline-flex items-center gap-2 border border-zinc-300 dark:border-zinc-700 rounded-xl px-4 py-3 h-14 cursor-pointer bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all duration-200 transform hover:scale-105"
              >
                <PlusCircleIcon className="w-5 h-5 text-zinc-600 dark:text-zinc-300" />
                <div className="text-sm text-zinc-600 dark:text-zinc-300 font-semibold">
                  Create Team
                </div>
              </div>
            )}
          </div>
        )}

        {userTeam ? (
          <div className="mt-6 border border-zinc-700 rounded-2xl p-6 bg-zinc-900/30 backdrop-blur-sm">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <h3 className="text-2xl font-semibold">{userTeam.name}</h3>
              <div className="flex flex-wrap gap-2 h-10">
                <Button className="bg-white text-black hover:bg-zinc-100 h-10" onClick={() => openDialog(true)}>Edit</Button>
                <Button className="bg-zinc-700 hover:bg-zinc-600 text-white h-10" onClick={handleGenerateInvite}>Invite</Button>
                <Button variant="destructive" className="bg-red-500 hover:bg-red-600 text-white h-10" onClick={openDeleteDialog}>
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              </div>
            </div>
            
            <div className="bg-zinc-800/50 rounded-xl p-4 mb-6">
              <p className="text-zinc-300">{userTeam.description}</p>
            </div>
            
            {userTeam.embeds && userTeam.embeds.length > 0 && (
              <div className="mb-6">
                <h4 className="text-lg font-medium mb-3 flex items-center gap-2">
                  <span className="inline-block w-1 h-4 bg-zinc-500 rounded-full"></span>
                  Embeds
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {userTeam.embeds.map((embed: Embed, idx: number) => (
                    <div key={idx} className="p-4 rounded-lg bg-zinc-800 flex items-center justify-between h-16">
                      <div className="truncate">
                        <span className="inline-block px-2 py-1 text-xs bg-zinc-700 text-zinc-300 uppercase rounded-md mr-2">{embed.type}</span>
                        <span className="text-zinc-200 truncate">{embed.url}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {userTeam.submitted_at ? (
              <div className="bg-zinc-900/20 border border-zinc-800 rounded-lg p-4">
                <div className="flex items-center">
                  <div className="bg-zinc-500 rounded-full w-2 h-2 mr-2"></div>
                  <p className="text-zinc-400">
                    Submitted on {new Date(userTeam.submitted_at).toLocaleDateString()} at {new Date(userTeam.submitted_at).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-yellow-900/20 border border-yellow-800 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="bg-yellow-500 rounded-full w-2 h-2 mr-2"></div>
                    <p className="text-yellow-400">Not submitted yet</p>
                  </div>
                  <Button 
                    onClick={() => setIsConfirmDialogOpen(true)} 
                    className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-md text-sm"
                  >
                    Submit
                  </Button>
                </div>
              </div>
            )}
          </div>
        ) : null}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-zinc-900 border-zinc-700 text-white rounded-xl max-w-xl p-0 overflow-hidden">
          <DialogHeader className="px-6 pt-6 pb-4 border-b border-zinc-800">
            <div className="flex justify-between items-center">
              <DialogTitle className="text-2xl font-bold">{team?.id === 0 ? 'Create a Team' : 'Edit Team'}</DialogTitle>
            </div>
          </DialogHeader>
          
          <div className="px-6 py-4 space-y-5 max-h-[70vh] overflow-y-auto">
            <div className="bg-zinc-800/50 border border-zinc-700 rounded-lg p-3 flex items-center gap-2">
              <AlertTriangleIcon className="h-5 w-5 text-zinc-400 flex-shrink-0" />
              <p className="text-sm text-zinc-300">
                {deadline ? `Hackathon deadline: ${deadline.toLocaleString()}` : 'Creating a team for information purposes only.'}
              </p>
            </div>
            
            <div>
              <label className="text-sm font-medium text-zinc-400 mb-2 block flex items-center gap-1">
                <Users className="h-4 w-4" />
                Team Name
              </label>
              <Input 
                placeholder="Enter your team name" 
                value={team?.name || ''} 
                onChange={(e) => setTeam((prev) => prev ? { ...prev, name: e.target.value } : prev)} 
                className="bg-zinc-800 border-zinc-700 focus:border-zinc-500 focus:ring-zinc-500 text-white h-12"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium text-zinc-400 mb-2 block flex items-center gap-1">
                <InfoIcon className="h-4 w-4" />
                Description
              </label>
              <Textarea 
                placeholder="What's your team about?" 
                value={team?.description || ''} 
                onChange={(e) => setTeam((prev) => prev ? { ...prev, description: e.target.value } : prev)} 
                className="bg-zinc-800 border-zinc-700 focus:border-zinc-500 focus:ring-zinc-500 text-white min-h-24"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium text-zinc-400 mb-2 block flex items-center gap-1">
                <WalletIcon className="h-4 w-4" />
                Wallet Address (optional)
              </label>
              <Input
                placeholder="Enter wallet address for rewards" 
                value={walletAddress} 
                onChange={(e) => setWalletAddress(e.target.value)} 
                className="bg-zinc-800 border-zinc-700 focus:border-zinc-500 focus:ring-zinc-500 text-white h-12"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium text-zinc-400 mb-2 block flex items-center gap-1">
                <Users className="h-4 w-4" />
                Team Members (optional)
              </label>
              
              <div className="flex gap-2 mb-3">
                <div className="relative flex-1">
                  <div className="relative">
                    <Input
                      placeholder="Enter username..."
                      value={newTeamMemberInput}
                      onChange={(e) => setNewTeamMemberInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && addTeamMember()}
                      className="flex-1 bg-zinc-800 border-zinc-700 focus:border-zinc-500 focus:ring-zinc-500 text-white h-12"
                    />
                  </div>
                </div>
                
                <Button 
                  onClick={addTeamMember} 
                  className="bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg h-12 px-4 border border-zinc-700"
                >
                  <Plus className="h-5 w-5" />
                </Button>
              </div>
              
              {teamMembers.length > 0 && (
                <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                  {teamMembers.map((member, idx) => (
                    <div key={idx} className="p-3 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-between h-12">
                      <div className="truncate flex-1 flex items-center gap-2">
                        <Users className="h-4 w-4 text-zinc-400" />
                        <span className="text-sm text-zinc-200">@{member}</span>
                      </div>
                      <div className="flex items-center">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 rounded-full hover:bg-zinc-700"
                          onClick={() => removeTeamMember(idx)}
                        >
                          <X className="h-3 w-3 text-zinc-400" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div>
              <label className="flex items-center justify-between text-sm font-medium text-zinc-400 mb-2">
                <span className="flex items-center gap-1">
                  <Link2Icon className="h-4 w-4" />
                  Embeds
                </span>
                <span className="text-xs text-zinc-500">Add links to your project repos, demos, etc.</span>
              </label>
              
              <div className="flex gap-2 mb-3">
                <Input 
                  placeholder="https://..." 
                  value={embedUrl} 
                  onChange={(e) => setEmbedUrl(e.target.value)} 
                  onKeyDown={(e) => e.key === 'Enter' && addEmbed()}
                  className="flex-1 bg-zinc-800 border-zinc-700 focus:border-zinc-500 focus:ring-zinc-500 text-white h-12"
                />
                <Select value={embedType} onValueChange={(value: 'url' | 'image') => setEmbedType(value)}>
                  <SelectTrigger className="w-24 bg-zinc-800 border-zinc-700 text-white h-12">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-800 border-zinc-700 text-white">
                    <SelectItem value="url">URL</SelectItem>
                    <SelectItem value="image">Image</SelectItem>
                  </SelectContent>
                </Select>
                <Button 
                  onClick={addEmbed} 
                  className="bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg h-12 px-4 border border-zinc-700"
                >
                  <Plus className="h-5 w-5" />
                </Button>
              </div>
              
              {team?.embeds && team.embeds.length > 0 && (
                <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                  {team.embeds.map((embed: Embed, idx: number) => (
                    <div key={idx} className="p-3 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-between h-12">
                      <div className="truncate flex-1">
                        <span className="inline-block px-2 py-0.5 text-xs bg-zinc-700 text-zinc-300 uppercase rounded-md mr-2">{embed.type}</span>
                        <span className="text-sm text-zinc-200 truncate">{embed.url}</span>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-6 w-6 rounded-full hover:bg-zinc-700"
                        onClick={() => removeEmbed(idx)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <DialogFooter className="px-6 py-4 bg-zinc-900 border-t border-zinc-800 flex justify-end">
            <div className="flex w-full justify-end gap-3">
              <Button 
                variant="outline" 
                onClick={() => setIsDialogOpen(false)}
                className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 h-12"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleSave}
                className="bg-zinc-700 hover:bg-zinc-600 text-white h-12 cursor-pointer"
              >
                {team?.id === 0 ? 'Create' : 'Save'}
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Dialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
        <DialogContent className="bg-zinc-900 border-zinc-700 text-white rounded-xl p-6 max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Confirm Submission</DialogTitle>
          </DialogHeader>
          
          <div className="py-4 space-y-4">
            <div className="bg-yellow-900/30 border border-yellow-800 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertTriangleIcon className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                <p className="text-zinc-300">
                  <span className="font-semibold text-yellow-400 block mb-1">This action is irreversible!</span>
                  Make sure you&apos;ve fully edited your project details before submitting. You won&apos;t be able to make changes after submission.
                </p>
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="confirm-text" className="text-sm text-zinc-400 block">
                Type <span className="font-mono bg-zinc-800 px-2 py-0.5 rounded text-yellow-400">confirm</span> to proceed:
              </label>
              <Input
                id="confirm-text"
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                className="bg-zinc-800 border-zinc-700 focus:border-zinc-500 focus:ring-zinc-500 text-white h-12"
                placeholder="confirm"
              />
            </div>
          </div>
          
          <DialogFooter>
            <div className="flex w-full justify-end gap-3 mt-4">
              <Button 
                variant="outline" 
                onClick={() => {
                  setIsConfirmDialogOpen(false);
                  setConfirmText('');
                }}
                className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 h-12"
              >
                Back
              </Button>
              <Button 
                onClick={handleSubmit}
                disabled={confirmText !== 'confirm'}
                className={`h-12 ${confirmText === 'confirm' ? 'bg-yellow-600 hover:bg-yellow-700' : 'bg-zinc-700 opacity-50 cursor-not-allowed'} text-white`}
              >
                Confirm
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="bg-zinc-900 border-zinc-700 text-white rounded-xl p-6 max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-red-500">Delete Team</DialogTitle>
          </DialogHeader>
          <p className="py-4 text-zinc-300">
            Are you sure you want to delete your team? This action cannot be undone.
          </p>
          <DialogFooter>
            <div className="flex w-full justify-end gap-3 mt-4">
              <Button 
                variant="outline" 
                onClick={() => setIsDeleteDialogOpen(false)}
                className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 h-12"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleDeleteTeam}
                className="bg-red-500 hover:bg-red-600 text-white h-12"
              >
                Delete Team
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}