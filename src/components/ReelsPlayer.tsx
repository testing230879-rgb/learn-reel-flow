import { useEffect, useRef, useState } from "react";
import YouTube, { YouTubeEvent } from "react-youtube";
import { YouTubeVideo } from "@/hooks/useYouTubeSearch";
import { cn } from "@/lib/utils";
import { Volume2, VolumeX, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ReelsPlayerProps {
  videos: YouTubeVideo[];
  onSaveVideo: (video: YouTubeVideo) => void;
}

export const ReelsPlayer = ({ videos, onSaveVideo }: ReelsPlayerProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [muted, setMuted] = useState(true);
  const [savedVideos, setSavedVideos] = useState<Set<string>>(new Set());
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRefs = useRef<Map<number, any>>(new Map());
  const { toast } = useToast();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      const windowHeight = container.clientHeight;
      const newIndex = Math.round(scrollTop / windowHeight);
      
      if (newIndex !== currentIndex && newIndex < videos.length) {
        setCurrentIndex(newIndex);
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [currentIndex, videos.length]);

  useEffect(() => {
    // Auto-play current video, pause others
    playerRefs.current.forEach((player, index) => {
      if (player) {
        try {
          // Check if player is ready and attached to DOM
          const iframe = player.getIframe();
          if (iframe && iframe.src) {
            if (index === currentIndex) {
              player.playVideo();
            } else {
              player.pauseVideo();
            }
          }
        } catch (error) {
          // Silently handle if player isn't ready yet
          console.debug('Player not ready yet:', error);
        }
      }
    });
  }, [currentIndex]);

  const handlePlayerReady = (event: YouTubeEvent, index: number) => {
    const player = event.target;
    playerRefs.current.set(index, player);
    
    // Use setTimeout to ensure player is fully attached to DOM
    setTimeout(() => {
      try {
        if (index === currentIndex) {
          if (muted) {
            player.mute();
          }
          player.playVideo();
        }
      } catch (error) {
        console.debug('Player initialization delayed:', error);
      }
    }, 100);
  };

  const toggleMute = () => {
    const player = playerRefs.current.get(currentIndex);
    if (player) {
      try {
        if (muted) {
          player.unMute();
        } else {
          player.mute();
        }
        setMuted(!muted);
      } catch (error) {
        console.debug('Mute toggle error:', error);
      }
    }
  };

  const handleSaveVideo = (video: YouTubeVideo) => {
    onSaveVideo(video);
    setSavedVideos(prev => new Set(prev).add(video.id));
    toast({
      title: "Video saved!",
      description: "Added to your saved videos",
    });
  };

  const opts = {
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: 0,
      controls: 0,
      modestbranding: 1,
      rel: 0,
      loop: 1,
    },
  };

  if (videos.length === 0) {
    return (
      <div className="h-full flex items-center justify-center text-muted-foreground">
        <p>Search for a topic to start watching</p>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className="h-full overflow-y-scroll snap-y snap-mandatory scrollbar-hide"
      style={{ scrollbarWidth: "none" }}
    >
      {videos.map((video, index) => (
        <div
          key={video.id}
          className="h-full w-full snap-start snap-always flex items-center justify-center bg-background relative"
        >
          <div className="relative flex items-center justify-center gap-4 w-full px-4">
            <div className="w-full max-w-md aspect-[9/16] bg-black rounded-lg overflow-hidden relative">
              <YouTube
                videoId={video.id}
                opts={opts}
                onReady={(e) => handlePlayerReady(e, index)}
                onEnd={(e) => e.target.playVideo()}
                className="w-full h-full"
              />
              
              <div className="absolute bottom-8 left-4 right-4 text-white animate-in fade-in-0 slide-in-from-bottom-5">
                <p className="text-sm font-medium line-clamp-2 drop-shadow-lg">
                  {video.title}
                </p>
                <p className="text-xs text-gray-300 mt-1 drop-shadow-lg">
                  {video.channelTitle}
                </p>
              </div>
            </div>
            
            <div className="flex flex-col gap-3">
              <button
                onClick={toggleMute}
                className={cn(
                  "p-3 bg-muted/80 backdrop-blur-sm rounded-full hover:bg-muted transition-all hover:scale-110 active:scale-95",
                  index === currentIndex && "animate-in fade-in-0 slide-in-from-right-5"
                )}
              >
                {muted ? (
                  <VolumeX className="h-5 w-5" />
                ) : (
                  <Volume2 className="h-5 w-5" />
                )}
              </button>
              
              <button
                onClick={() => handleSaveVideo(video)}
                className={cn(
                  "px-4 py-2 rounded-full transition-all hover:scale-105 active:scale-95 text-sm font-medium shadow-lg hover:shadow-xl flex items-center gap-2",
                  savedVideos.has(video.id)
                    ? "bg-green-600 text-white hover:bg-green-700"
                    : "bg-primary text-primary-foreground hover:bg-primary/90",
                  index === currentIndex && "animate-in fade-in-0 slide-in-from-right-5"
                )}
              >
                {savedVideos.has(video.id) ? (
                  <>
                    <Check className="h-4 w-4" />
                    Saved
                  </>
                ) : (
                  "Save"
                )}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
