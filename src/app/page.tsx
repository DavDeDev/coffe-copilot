'use client';
import Image from 'next/image';
import UserCard from '@/components/ui/user-card';
import { prisma } from '../lib/cockroachDB';
import { getUser, getUsers } from '../lib/actions/users.actions';
import { useEffect, useState } from 'react';
import Topbar from '@/components/shared/Topbar';
import Grid from '@/components/shared/Grid';
import Recorder from '@/components/recorder';
import VideoRecorder from '@/components/VideoRecorder';
import AudioRecorder from '@/components/AudioRecorder';

interface User {
  id: number;
  name: string;
  image_url: string;
  short_bio: string;
}

export default function Home() {

  return (
    <>
      <Topbar />
      <main className="w-100">
        <Grid />
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
          
          <VideoRecorder />
          <AudioRecorder />
        </div>
      </main>
    </>
  );
}
