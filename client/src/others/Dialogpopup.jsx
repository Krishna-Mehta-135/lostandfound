import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
  } from "@/components/ui/dialog";
  
  export default function Dialogpopup() {
    return (
      <Dialog>
        <DialogTrigger className="bg-blue-500 px-4 py-2 rounded-md text-white">View Details</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Item Details</DialogTitle>
            <DialogDescription>
              <img src="image_url" alt="item" className="rounded-xl w-full h-60 object-cover mb-4" />
              <p className="text-sm">This is the description of the item...</p>
              <p className="text-sm mt-2">Question: Was the item wet or dry?</p>
              <p className="text-sm mt-2 font-semibold">Contact: abc@example.com</p>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
  }
  