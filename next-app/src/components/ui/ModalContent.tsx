import {
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@radix-ui/react-dialog";
import React, { useEffect, useState } from "react";
import { DialogFooter, DialogHeader } from "./dialog";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Input } from "./input";
import { Button } from "./button";
import Recorder from "../recorder";
import { createConversation } from "@/lib/actions/conversations.actions";
import { createUser } from "@/lib/actions/users.actions";

type Props = {};

function ModalContent({}: Props) {
  const [conversationID, setConversationID] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [currStage, setCurrStage] = useState(0);

  const onClickHandler = async () => {
    const newUser = await createUser(name, bio);
    const conversation_id = await createConversation(newUser);
    console.log(conversation_id);
    
    setConversationID(conversation_id);
    setCurrStage(1)
  };


  function renderModalContent() {
    switch (currStage) {
      case 0:
        return (
          <DialogContent className="sm:max-w-[425px] fixed  bg-accent py-12 px-12">
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Short Bio (optional)</Label>
                <Input
                  id="username"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={(onClickHandler)} type="button">
                Start conversation
              </Button>
            </DialogFooter>
          </DialogContent>
        );
      case 1:
        return (
          <DialogContent className="sm:max-w-[425px] fixed top-1/2 left-1/2 bg-accent py-12 px-12">
            <Recorder conversationID={conversationID} />
          </DialogContent>
        );
      default:
        return <div>TEST</div>;
    }
  }
  return renderModalContent();
}

export default ModalContent;
