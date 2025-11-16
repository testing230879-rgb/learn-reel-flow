import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TiptapEditor } from "./TiptapEditor";
import { ExcalidrawBoard } from "./ExcalidrawBoard";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NotesPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotesPanel = ({ isOpen, onClose }: NotesPanelProps) => {
  const [activeTab, setActiveTab] = useState("notes");

  if (!isOpen) return null;

  return (
    <div className="h-full bg-notes-bg border-l border-panel-border flex flex-col">
      <div className="flex items-center justify-between px-4 py-3 border-b border-panel-border">
        <h2 className="text-lg font-semibold text-foreground">Notes</h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="h-8 w-8 text-muted-foreground hover:text-foreground lg:hidden"
        >
          <X className="h-5 w-5" />
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <TabsList className="w-full justify-start rounded-none border-b border-panel-border bg-transparent px-4">
          <TabsTrigger 
            value="notes"
            className="data-[state=active]:bg-muted data-[state=active]:text-foreground"
          >
            Notes
          </TabsTrigger>
          <TabsTrigger 
            value="excalidraw"
            className="data-[state=active]:bg-muted data-[state=active]:text-foreground"
          >
            Excalidraw
          </TabsTrigger>
        </TabsList>

        <TabsContent value="notes" className="flex-1 m-0">
          <TiptapEditor />
        </TabsContent>

        <TabsContent value="excalidraw" className="flex-1 m-0">
          <ExcalidrawBoard />
        </TabsContent>
      </Tabs>
    </div>
  );
};
