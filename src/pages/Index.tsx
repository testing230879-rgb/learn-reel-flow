import { useState, useEffect } from "react";
import { ApiKeyModal } from "@/components/ApiKeyModal";
import { BottomNav } from "@/components/BottomNav";
import { ReelsPlayer } from "@/components/ReelsPlayer";
import { NotesPanel } from "@/components/NotesPanel";
import { useYouTubeSearch, YouTubeVideo } from "@/hooks/useYouTubeSearch";
import { useNavigate } from "react-router-dom";
import { Sheet, SheetContent } from "@/components/ui/sheet";

interface Playlist {
  id: string;
  name: string;
  videos: YouTubeVideo[];
}

const Index = () => {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [showApiModal, setShowApiModal] = useState(false);
  const [notesOpen, setNotesOpen] = useState(false);
  const [currentTopic, setCurrentTopic] = useState("");
  const [currentView, setCurrentView] = useState<"home" | "search" | "notes" | "saved">("home");
  const navigate = useNavigate();

  const { videos, searchVideos, getRandomTopic, PREDEFINED_TOPICS } = useYouTubeSearch(apiKey);

  useEffect(() => {
    const savedApiKey = localStorage.getItem("youtube-api-key");
    if (savedApiKey) {
      setApiKey(savedApiKey);
    } else {
      setShowApiModal(true);
    }
  }, []);

  useEffect(() => {
    if (apiKey && !currentTopic) {
      const randomTopic = getRandomTopic();
      setCurrentTopic(randomTopic);
      searchVideos(randomTopic);
    }
  }, [apiKey, currentTopic]);

  const handleApiKeySubmit = (key: string) => {
    setApiKey(key);
    localStorage.setItem("youtube-api-key", key);
    setShowApiModal(false);
    const randomTopic = getRandomTopic();
    setCurrentTopic(randomTopic);
    searchVideos(randomTopic);
  };

  const handleSearch = (query: string) => {
    setCurrentTopic(query);
    searchVideos(query);
  };

  const handleSaveVideo = (video: YouTubeVideo) => {
    const savedPlaylists = localStorage.getItem("playlists");
    let playlists: Playlist[] = savedPlaylists ? JSON.parse(savedPlaylists) : [];

    const existingPlaylist = playlists.find((p) => p.name === currentTopic);

    if (existingPlaylist) {
      if (!existingPlaylist.videos.find((v) => v.id === video.id)) {
        existingPlaylist.videos.push(video);
      }
    } else {
      playlists.push({
        id: Date.now().toString(),
        name: currentTopic,
        videos: [video],
      });
    }

    localStorage.setItem("playlists", JSON.stringify(playlists));
  };

  return (
    <>
      <ApiKeyModal open={showApiModal} onSubmit={handleApiKeySubmit} />
      
      <div className="h-screen flex flex-col overflow-hidden pb-16">
        <div className="flex-1 overflow-hidden">
          <ReelsPlayer videos={videos} onSaveVideo={handleSaveVideo} />
        </div>

        <Sheet open={notesOpen} onOpenChange={setNotesOpen}>
          <SheetContent side="right" className="w-full sm:w-[400px] p-0">
            <NotesPanel isOpen={notesOpen} onClose={() => setNotesOpen(false)} />
          </SheetContent>
        </Sheet>

        <BottomNav
          onSearch={handleSearch}
          onToggleNotes={() => setNotesOpen(!notesOpen)}
          onToggleSaved={() => navigate("/saved")}
          suggestions={PREDEFINED_TOPICS}
          currentView={currentView}
          onViewChange={setCurrentView}
        />
      </div>
    </>
  );
};

export default Index;
