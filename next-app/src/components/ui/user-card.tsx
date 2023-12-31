// Create a card, i pass áimage url, name, short_bio, and id
import Image from "next/image";
import Link from "next/link";
import React from "react";
interface UserCardProps {
  id: number;
  imageUrl: string;
  name: string;
  shortBio: string;
}
const UserCard = (props: UserCardProps) => {
  
  return (
    <Link href={`/${props.id}`} className="w-full bg-accent py-7 flex flex-col gap-1 items-center justify-center rounded-xl cursor-pointer">
      <div className="">
        {props.imageUrl ? (
          <Image
            className="rounded-xl mb-4"
            src={props.imageUrl}
            alt={props.name}
            width={100}
            height={100}
          />
        ): <Image
        className="rounded-xl mb-4"
        src={"/profilepic.jpeg"}
        alt={props.name}
        width={100}
        height={100}
      />}
      </div>
      <p className="font-semibold">{props.name}</p>

      <p className="">{props.shortBio}</p>
      <p className="text-sm text-gray-500">Last chatted: 3w ago</p>
    </Link>
  );
};

export default UserCard;
