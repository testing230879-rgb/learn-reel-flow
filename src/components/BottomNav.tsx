import { Home, Search, StickyNote, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface BottomNavProps {
  onSearch: (query: string) => void;
  onToggleNotes: () => void;
  onToggleSaved: () => void;
  suggestions: string[];
  currentView: "home" | "search" | "notes" | "saved";
  onViewChange: (view: "home" | "search" | "notes" | "saved") => void;
}

export const BottomNav = ({
  onSearch,
  onToggleNotes,
  onToggleSaved,
  suggestions,
  currentView,
  onViewChange,
}: BottomNavProps) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);

  const handleSearchClick = () => {
    setIsSearchOpen(true);
    onViewChange("search");
  };

  const handleHomeClick = () => {
    onViewChange("home");
  };

  const handleNotesClick = () => {
    onToggleNotes();
    onViewChange("notes");
  };

  const handleSavedClick = () => {
    onToggleSaved();
    onViewChange("saved");
  };

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    onSearch(searchQuery);
    setShowSuggestions(false);
    setIsSearchOpen(false);
  };

  const handleQueryChange = (value: string) => {
    setQuery(value);
    if (value.length > 0) {
      const filtered = suggestions.filter((s) =>
        s.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSuggestions(filtered.slice(0, 8));
      setShowSuggestions(filtered.length > 0);
    } else {
      setShowSuggestions(false);
    }
  };

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border">
        <div className="flex items-center justify-around h-12 max-w-md mx-auto">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleHomeClick}
            className={cn(
              "flex flex-col items-center justify-center h-full w-full gap-1 rounded-none hover:bg-accent/50",
              currentView === "home" && "text-primary"
            )}
          >
            <Home className="h-5 w-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={handleSearchClick}
            className={cn(
              "flex flex-col items-center justify-center h-full w-full gap-1 rounded-none hover:bg-accent/50",
              currentView === "search" && "text-primary"
            )}
          >
            <Search className="h-5 w-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={handleNotesClick}
            className={cn(
              "flex flex-col items-center justify-center h-full w-full gap-1 rounded-none hover:bg-accent/50",
              currentView === "notes" && "text-primary"
            )}
          >
            <StickyNote className="h-5 w-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={handleSavedClick}
            className={cn(
              "flex flex-col items-center justify-center h-full w-full gap-1 rounded-none hover:bg-accent/50",
              currentView === "saved" && "text-primary"
            )}
          >
            <Bookmark className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Search Topics</DialogTitle>
          </DialogHeader>
          <div className="relative">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => handleQueryChange(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && query.trim()) {
                    handleSearch(query);
                  }
                }}
                placeholder="Search for topics..."
                className="pl-9"
                autoFocus
              />
            </div>
            {showSuggestions && filteredSuggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-lg shadow-lg max-h-60 overflow-y-auto z-10">
                {filteredSuggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSearch(suggestion)}
                    className="w-full px-4 py-2 text-left hover:bg-accent transition-colors text-sm"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
