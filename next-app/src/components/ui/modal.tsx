import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@radix-ui/react-dialog';
import { Label } from '@radix-ui/react-dropdown-menu';
import { Button } from './button';
import { DialogHeader, DialogFooter } from './dialog';
import { Input } from './input';

const Modal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="fixed bottom-10 right-10 bg-blue-500 hover:bg-blue-600 text-white  rounded-full shadow-md py-10 px-10 font-bold"
        >
          Start Conversation
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] fixed top-1/2 left-1/2 bg-black" >
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value="Super Mario" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Short Bio (optional)
            </Label>
            <Input id="username" value="@peduarte" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};


export default Modal;