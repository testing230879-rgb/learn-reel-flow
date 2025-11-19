import { useState, useEffect } from "react";
import { ApiKeyModal } from "@/components/ApiKeyModal";
import { SearchBar } from "@/components/SearchBar";
import { ReelsPlayer } from "@/components/ReelsPlayer";
import { NotesPanel } from "@/components/NotesPanel";
import { useYouTubeSearch, YouTubeVideo } from "@/hooks/useYouTubeSearch";
import { useNavigate } from "react-router-dom";
import bloomLogoDark from "@/assets/bloom-logo-dark.png";
import bloomLogoLight from "@/assets/bloom-logo-light.png";

interface Playlist {
  id: string;
  name: string;
  videos: YouTubeVideo[];
}

const Index = () => {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [showApiModal, setShowApiModal] = useState(false);
  const [notesOpen, setNotesOpen] = useState(true);
  const [currentTopic, setCurrentTopic] = useState("");
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
      
      <div className="h-screen flex flex-col overflow-hidden">
        <header className="h-16 flex items-center justify-center border-b border-border bg-background/80 backdrop-blur-sm">
          <img 
            src={bloomLogoLight} 
            alt="Bloom Scrolling" 
            className="h-10 dark:hidden"
          />
          <img 
            src={bloomLogoDark} 
            alt="Bloom Scrolling" 
            className="h-10 hidden dark:block"
          />
        </header>

        <SearchBar
          onSearch={handleSearch}
          onToggleNotes={() => setNotesOpen(!notesOpen)}
          onToggleSaved={() => navigate("/saved")}
          suggestions={PREDEFINED_TOPICS}
        />

        <div className="flex-1 flex overflow-hidden">
          <div className={`flex-1 ${notesOpen ? "lg:w-[70%]" : "w-full"}`}>
            <ReelsPlayer videos={videos} onSaveVideo={handleSaveVideo} />
          </div>

          <div className={`${notesOpen ? "w-full lg:w-[30%]" : "hidden"} ${notesOpen ? "block" : ""}`}>
            <NotesPanel isOpen={notesOpen} onClose={() => setNotesOpen(false)} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
