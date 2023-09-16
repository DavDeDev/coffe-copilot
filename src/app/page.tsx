import Image from 'next/image';
import { connectToDB } from '../lib/cockroachDB';

export default function Home() {
  connectToDB();
  return (
    <main>
      Put Cards here inside
    </main>
  );
}
