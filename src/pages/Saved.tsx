import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { YouTubeVideo } from "@/hooks/useYouTubeSearch";

interface Playlist {
  id: string;
  name: string;
  videos: YouTubeVideo[];
}

const Saved = () => {
  const navigate = useNavigate();
  const [playlists, setPlaylists] = useState<Playlist[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("playlists");
    if (saved) {
      setPlaylists(JSON.parse(saved));
    }
  }, []);

  const deletePlaylist = (id: string) => {
    const updated = playlists.filter((p) => p.id !== id);
    setPlaylists(updated);
    localStorage.setItem("playlists", JSON.stringify(updated));
  };

  const deleteVideo = (playlistId: string, videoId: string) => {
    const updated = playlists.map((p) =>
      p.id === playlistId
        ? { ...p, videos: p.videos.filter((v) => v.id !== videoId) }
        : p
    );
    setPlaylists(updated);
    localStorage.setItem("playlists", JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-6 text-foreground hover:bg-muted"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>

        <h1 className="text-4xl font-bold mb-8 text-foreground">Saved Videos</h1>

        {playlists.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">No saved videos yet</p>
            <p className="text-muted-foreground text-sm mt-2">
              Save videos while watching to create playlists
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {playlists.map((playlist) => (
              <div key={playlist.id} className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-semibold text-foreground">{playlist.name}</h2>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deletePlaylist(playlist.id)}
                    className="text-destructive hover:text-destructive/80"
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {playlist.videos.map((video) => (
                    <div
                      key={video.id}
                      className="bg-secondary rounded-lg overflow-hidden group relative"
                    >
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full aspect-video object-cover"
                      />
                      <div className="p-3">
                        <h3 className="text-sm font-medium text-foreground line-clamp-2 mb-1">
                          {video.title}
                        </h3>
                        <p className="text-xs text-muted-foreground">{video.channelTitle}</p>
                      </div>
                      <button
                        onClick={() => deleteVideo(playlist.id, video.id)}
                        className="absolute top-2 right-2 p-2 bg-black/70 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="h-4 w-4 text-white" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Saved;
