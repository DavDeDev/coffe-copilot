"use client";
import { getUser } from "@/lib/actions/users.actions";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import Image from "next/image";
import { findUserConversations } from "@/lib/actions/conversations.actions";

export default function Page() {
  const userid = usePathname();
  const [userInfo, setUserInfo] = useState<any>(null);
  const [convos, setConvos] = useState<any>([]);
  console.log(convos);

  useEffect(() => {
    async function fetchData() {
      try {
        const user = await getUser(userid.slice(1));
        console.log(user);
        const conversations = await findUserConversations(userid.slice(1));
        console.log(conversations);

        setConvos(conversations);
        setUserInfo(user);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="pb-12 ">
      {userInfo ? (
        <>
          <div className="h-full w-full p-12 flex flex-col justify-center items-center">
            <div className="">
              {userInfo.image_url ? (
                <Image
                  className="rounded-xl mb-4"
                  src={userInfo.image_url}
                  alt={userInfo.name}
                  width={100}
                  height={100}
                />
              ) : (
                <Image
                  className="rounded-xl mb-4"
                  src={"/profilepic.jpeg"}
                  alt={userInfo.name}
                  width={100}
                  height={100}
                />
              )}
            </div>
            <p className="font-semibold">{userInfo?.name}</p>

            <p className="">{userInfo?.short_bio}</p>
            <p className="text-sm text-gray-500">Last chatted: 3w ago</p>
          </div>
          <div className="flex flex-col gap-5 items-center">
            {convos.length &&
              convos.map((convo) => {
                return (
                  <div
                    key={convo.conversation_id}
                    className="flex flex-col gap-3 items-center justify-center max-w-[900px]"
                  >
                    <p className="text-lg font-semibold">Conversation summary</p>
                    <p className="text-center">{convo.summary}</p>
                    <p className="text-lg font-semibold">Future speaking points</p>
                    <p className="text-center">{convo.generated_prompts}</p>
                  </div>
                );
              })}
          </div>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
