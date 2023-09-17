import { NextResponse } from 'next/server';

import { Storage } from '@google-cloud/storage';
import { credentials } from '../../../../next-app/credentials';

// Creates a client
const storage = new Storage({
  projectId: 'coffee-copilot',
  credentials: credentials,
});

export async function POST(request: Request) {
  console.log('calling gcp api');
  // Lists files in the bucket
  const [files] = await storage.bucket('htn2023_coffee_copilot').getFiles();

  console.log('Files:');
  files.forEach((file) => {
    console.log(file);
  });
  // console.log(storage);
  console.log('calling POST');
  return NextResponse.json({ message: 'Hello World' });
}
