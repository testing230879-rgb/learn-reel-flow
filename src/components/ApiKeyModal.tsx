import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ApiKeyModalProps {
  open: boolean;
  onSubmit: (apiKey: string) => void;
}

export const ApiKeyModal = ({ open, onSubmit }: ApiKeyModalProps) => {
  const [apiKey, setApiKey] = useState("");

  const handleSubmit = () => {
    if (apiKey.trim()) {
      onSubmit(apiKey.trim());
    }
  };

  return (
    <Dialog open={open} modal>
      <DialogContent className="sm:max-w-md bg-card border-border" onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle className="text-2xl text-center mb-2">
            Enter YouTube API Key
          </DialogTitle>
          <DialogDescription className="text-center text-muted-foreground">
            Get a YouTube API key and enter it in the field below to enable the features of this site.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          <Input
            placeholder="Your API Key..."
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            className="bg-input border-border text-foreground"
          />
          <Button 
            onClick={handleSubmit} 
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            size="lg"
          >
            Continue
          </Button>
          <a 
            href="/api-tutorial" 
            className="block text-center text-sm text-primary hover:underline"
          >
            How to get an API key?
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
};
