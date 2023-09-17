import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@radix-ui/react-dialog";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Button } from "./button";
import { DialogHeader, DialogFooter } from "./dialog";
import { Input } from "./input";
import { useRef, useState } from "react";
import { createUser } from "@/lib/actions/users.actions";
import { createConversation } from "@/lib/actions/conversations.actions";
import ModalContent from "./ModalContent";

const Modal = () => {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="fixed bottom-10 right-10 bg-blue-500 hover:bg-blue-600 text-white  rounded-full shadow-md py-12 px-12 font-bold"
        >
          Start Conversation
        </Button>
      </DialogTrigger>
      <ModalContent />
    </Dialog>
  );
};

export default Modal;
