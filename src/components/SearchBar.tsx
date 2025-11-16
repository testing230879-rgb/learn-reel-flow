import { useState, useEffect, useRef } from "react";
import { Search, Bookmark, StickyNote } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  onSearch: (query: string) => void;
  onToggleNotes: () => void;
  onToggleSaved: () => void;
  suggestions: string[];
}

export const SearchBar = ({ onSearch, onToggleNotes, onToggleSaved, suggestions }: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (query.length > 0) {
      const filtered = suggestions.filter((s) =>
        s.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredSuggestions(filtered.slice(0, 8));
      setShowSuggestions(filtered.length > 0);
    } else {
      setShowSuggestions(false);
    }
  }, [query, suggestions]);

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    onSearch(searchQuery);
    setShowSuggestions(false);
    setIsDialogOpen(false);
  };

  return (
    <>
      <div className="relative flex items-center justify-between gap-3 px-4 py-3 bg-background border-b border-border">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsDialogOpen(true)}
          className="gap-2 hover:bg-muted transition-all hover:scale-105 active:scale-95"
        >
          <Search className="h-4 w-4" />
          <span className="text-sm">Search Topics</span>
        </Button>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleSaved}
            className="h-9 w-9 text-foreground hover:bg-muted transition-all hover:scale-110 active:scale-95"
          >
            <Bookmark className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleNotes}
            className="h-9 w-9 text-foreground hover:bg-muted transition-all hover:scale-110 active:scale-95"
          >
            <StickyNote className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md animate-in fade-in-0 zoom-in-95">
          <DialogHeader>
            <DialogTitle>Search for a Topic</DialogTitle>
          </DialogHeader>
          <div className="relative mt-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                ref={inputRef}
                type="text"
                placeholder="e.g., Python, Machine Learning, SQL..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && query && handleSearch(query)}
                onFocus={() => query && setShowSuggestions(true)}
                className="pl-12 pr-4 h-12 bg-search-bg border-border text-foreground rounded-lg"
                autoFocus
              />
            </div>
            
            {showSuggestions && filteredSuggestions.length > 0 && (
              <div className="mt-3 bg-popover border border-border rounded-lg overflow-hidden animate-in fade-in-0 slide-in-from-top-2">
                <div className="py-2">
                  <div className="px-4 py-2 text-xs text-muted-foreground font-medium">
                    Suggestions
                  </div>
                  {filteredSuggestions.map((suggestion, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSearch(suggestion)}
                      className="w-full px-4 py-2.5 text-left hover:bg-muted transition-all text-sm text-foreground hover:translate-x-1"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
