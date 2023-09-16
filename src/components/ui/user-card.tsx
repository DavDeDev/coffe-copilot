// Create a card, i pass áimage url, name, short_bio, and id
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface UserCardProps {
  id: number;
  imageUrl: string;
  name: string;
  shortBio: string;
}
const UserCard = (props: UserCardProps) => {
  return (
    <div className='rounded-lg border bg-card text-card-foreground shadow-sm'>
      <Avatar>
        <AvatarImage src={props.imageUrl} />
        <AvatarFallback>{props.name}</AvatarFallback>
      </Avatar>
      <p>{props.shortBio}</p>
    </div>
  );
};

export default UserCard;