import { TiptapEditor } from "./TiptapEditor";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NotesPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotesPanel = ({ isOpen, onClose }: NotesPanelProps) => {
  if (!isOpen) return null;

  return (
    <div className="h-full bg-notes-bg border-l border-panel-border flex flex-col animate-in slide-in-from-right duration-300">
      <div className="flex items-center justify-between px-4 py-3 border-b border-panel-border">
        <h2 className="text-lg font-semibold text-foreground">Notes</h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-muted transition-all hover:scale-110 active:scale-95 lg:hidden"
        >
          <X className="h-5 w-5" />
        </Button>
      </div>

      <div className="flex-1">
        <TiptapEditor />
      </div>
    </div>
  );
};
