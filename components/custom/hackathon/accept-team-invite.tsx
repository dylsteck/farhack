'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { farhackSDK } from '@/app/lib/api';
import { useSession } from 'next-auth/react';

export default function AcceptTeamInvite({ params }: { params: { slug: string } }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user;
  const [inviteStatus, setInviteStatus] = useState<'pending' | 'accepted' | 'failed'>('pending');

  useEffect(() => {
    const acceptInvite = async () => {
      const token = searchParams.get('token');
      if (!token || !user) return setInviteStatus('failed');

      try {
        await farhackSDK.acceptInvite(params.slug, token, parseInt(user.id ?? ''));
        setInviteStatus('accepted');
      } catch (error) {
        setInviteStatus('failed');
      }
    };

    if (user) acceptInvite();
  }, [searchParams, user, params.slug]);

  return (
    <div className="flex items-center justify-center min-h-screen text-white text-2xl">
      {inviteStatus === 'accepted' ? (
        <p className="p-15">
          Invite accepted!{' '}
          <a href={`/hackathons/${params.slug}/your-team`} className="underline">
            Click here to view team
          </a>
        </p>
      ) : inviteStatus === 'failed' ? (
        <p className="p-15">Failed: Unable to process invite</p>
      ) : (
        <p className="p-15">Processing invite...</p>
      )}
    </div>
  );
}