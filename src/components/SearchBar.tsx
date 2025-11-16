import { useState, useEffect, useRef } from "react";
import { Search, Bookmark, StickyNote } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
  };

  return (
    <div className="relative flex items-center gap-4 px-6 py-4 bg-background border-b border-border">
      <div className="flex-1 relative max-w-2xl mx-auto">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            ref={inputRef}
            type="text"
            placeholder="Search for a topic"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && query && handleSearch(query)}
            onFocus={() => query && setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            className="pl-12 pr-4 h-12 bg-search-bg border-border text-foreground rounded-full"
          />
        </div>
        
        {showSuggestions && filteredSuggestions.length > 0 && (
          <div className="absolute top-full mt-2 w-full bg-popover border border-border rounded-lg shadow-lg overflow-hidden z-50">
            <div className="py-2">
              <div className="px-4 py-2 text-xs text-muted-foreground font-medium">
                Real-time suggestions
              </div>
              {filteredSuggestions.map((suggestion, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSearch(suggestion)}
                  className="w-full px-4 py-2.5 text-left hover:bg-muted transition-colors text-sm text-foreground"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleSaved}
          className="h-10 w-10 text-foreground hover:bg-muted"
        >
          <Bookmark className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleNotes}
          className="h-10 w-10 text-foreground hover:bg-muted"
        >
          <StickyNote className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};
