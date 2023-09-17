// Create a card, i pass áimage url, name, short_bio, and id
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Cagliostro } from 'next/font/google';
import Tilt from 'react-tilt';
import Image from 'next/image';
interface UserCardProps {
  id: number;
  imageUrl: string;
  name: string;
  shortBio: string;
}
const UserCard = (props: UserCardProps) => {
  return (
    <div className="w-full h-[30vh] rounded-lg bg-accent flex flex-col justify-center ">
      <div>
        <Image src={props.imageUrl} alt={props.name} width={100} height={100} />
      </div>
      <p className="">{props.shortBio}</p>
    </div>
  );
};

export default UserCard;
