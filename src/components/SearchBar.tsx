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
  const [isVisible, setIsVisible] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const hideTimeoutRef = useRef<NodeJS.Timeout>();

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

  useEffect(() => {
    const resetTimer = () => {
      setIsVisible(true);
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
      hideTimeoutRef.current = setTimeout(() => {
        setIsVisible(false);
      }, 3000);
    };

    const handleActivity = () => {
      resetTimer();
    };

    // Show bar initially
    resetTimer();

    // Listen for user activity
    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('touchstart', handleActivity);
    window.addEventListener('scroll', handleActivity);
    window.addEventListener('click', handleActivity);

    return () => {
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('touchstart', handleActivity);
      window.removeEventListener('scroll', handleActivity);
      window.removeEventListener('click', handleActivity);
    };
  }, []);

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    onSearch(searchQuery);
    setShowSuggestions(false);
    setIsDialogOpen(false);
  };

  return (
    <>
      <div className={cn(
        "relative flex items-center justify-between gap-2 px-3 py-2 bg-white/5 dark:bg-black/5 backdrop-blur-lg border-b border-white/10 dark:border-white/5 transition-all duration-500",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
      )}>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsDialogOpen(true)}
          className="gap-1.5 hover:bg-muted/50 transition-all hover:scale-105 active:scale-95 h-8 text-xs px-2"
        >
          <Search className="h-3.5 w-3.5" />
          <span>Search</span>
        </Button>

        <div className="flex items-center gap-1.5">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleSaved}
            className="h-7 w-7 text-foreground hover:bg-muted/50 transition-all hover:scale-110 active:scale-95"
          >
            <Bookmark className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleNotes}
            className="h-7 w-7 text-foreground hover:bg-muted/50 transition-all hover:scale-110 active:scale-95"
          >
            <StickyNote className="h-3.5 w-3.5" />
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
