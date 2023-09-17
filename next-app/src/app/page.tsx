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
import React from 'react';
import StartButton from '@/components/ui/start-button';
import { DialogHeader } from '@/components/ui/dialog';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@radix-ui/react-dialog';
import Modal from '@/components/ui/modal';

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
        {/* <div className="flex flex-col items-center justify-center min-h-screen py-2">
          <VideoRecorder />
          <AudioRecorder />
          <Dialog>
            <DialogTrigger>
              <StartButton />
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you sure absolutely sure?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div> */}
        <Modal />
      </main>
    </>
  );
}
