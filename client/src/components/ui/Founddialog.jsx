// components/FoundDialog.jsx
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
  } from "@/components/ui/dialog";
  import { Button } from "@/components/ui/button";
  
  export default function FoundDialog() {
    return (
      <Dialog>
        <DialogTrigger>
          <Button>View Details</Button>
        </DialogTrigger>
        <DialogContent className="max-w-md md:max-w-2xl rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-slate-800">
              🎒 Matching Item Found
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              We found an item that matches your search!
            </DialogDescription>
          </DialogHeader>
  
          <div className="flex flex-col md:flex-row gap-4 mt-4">
            {/* Image */}
            <img
              src="https://via.placeholder.com/200"
              alt="Found Item"
              className="rounded-lg w-full md:w-1/2 h-auto object-cover shadow"
            />
  
            {/* Details */}
            <div className="flex-1 space-y-2">
              <p><span className="font-semibold">Name:</span> Black Backpack</p>
              <p><span className="font-semibold">Description:</span> Found near cafeteria. Medium-sized, has a red zipper and water bottle inside.</p>
  
              <div className="mt-3">
                <p className="font-semibold mb-1">Suggested Questions:</p>
                <ul className="list-disc list-inside text-sm space-y-1">
                  <li>What brand is the backpack?</li>
                  <li>What was inside the front pocket?</li>
                  <li>Is there any keychain attached?</li>
                </ul>
              </div>
  
              <p className="text-sm mt-3">
                📧 <span className="font-semibold">Contact:</span> someone@example.com
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }
  