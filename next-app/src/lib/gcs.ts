'use server';
import { Storage } from '@google-cloud/storage';

// Creates a client
const storage = new Storage();

export const listFiles = async () => {
  // Lists files in the bucket
  const [files] = await storage.bucket('htn2023_coffee_copilot').getFiles();

  console.log('Files:');
  files.forEach((file) => {
    console.log(file.name);
  });
}

export const uploadFile = async function uploadFile(destFileName,filePath) {
  const options = {
    destination: destFileName,
    // Optional:
    // Set a generation-match precondition to avoid potential race conditions
    // and data corruptions. The request to upload is aborted if the object's
    // generation number does not match your precondition. For a destination
    // object that does not yet exist, set the ifGenerationMatch precondition to 0
    // If the destination object already exists in your bucket, set instead a
    // generation-match precondition using its generation number.
    // preconditionOpts: {ifGenerationMatch: generationMatchPrecondition},
  };

  await storage.bucket('htn2023_coffee_copilot').upload(filePath, options);
  console.log(`${filePath} uploaded to ${'htn2023_coffee_copilot'}`);
}

