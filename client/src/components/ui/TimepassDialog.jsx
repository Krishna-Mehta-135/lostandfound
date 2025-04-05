// File: src/components/TimepassDialog.jsx
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
  } from "@/components/ui/dialog";
  
  export default function TimepassDialog() {
    return (
      <Dialog>
        <DialogTrigger className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
          Open Timepass Popup
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Just a Timepass</DialogTitle>
            <DialogDescription>
              This is a beautiful minimal popup created using ShadCN. 😎
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 text-sm text-muted-foreground">
            You can place anything here — text, images, even forms.  
          </div>
        </DialogContent>
      </Dialog>
    );
  }
  