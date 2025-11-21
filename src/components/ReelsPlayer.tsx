import { useEffect, useRef, useState } from "react";
import YouTube, { YouTubeEvent } from "react-youtube";
import { YouTubeVideo } from "@/hooks/useYouTubeSearch";
import { cn } from "@/lib/utils";
import { Volume2, VolumeX, Heart, MessageCircle, Share2, Bookmark } from "lucide-react";
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
      duration: 2000,
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
          className="h-full w-full snap-start snap-always flex items-center justify-center bg-black relative"
        >
          <div className="w-full h-full bg-black relative">
            <YouTube
              videoId={video.id}
              opts={opts}
              onReady={(e) => handlePlayerReady(e, index)}
              onEnd={(e) => e.target.playVideo()}
              className="w-full h-full"
            />
            
            {/* Right Side Action Buttons - Instagram Style */}
            <div className="absolute right-3 bottom-24 flex flex-col gap-6 items-center">
              <button
                className={cn(
                  "flex flex-col items-center gap-1 transition-all hover:scale-110 active:scale-95",
                  index === currentIndex && "animate-in fade-in-0 slide-in-from-right-5"
                )}
              >
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white/30 transition-colors">
                  <Heart className="h-6 w-6 text-white" />
                </div>
                <span className="text-white text-xs font-medium drop-shadow-lg">234K</span>
              </button>

              <button
                className={cn(
                  "flex flex-col items-center gap-1 transition-all hover:scale-110 active:scale-95",
                  index === currentIndex && "animate-in fade-in-0 slide-in-from-right-5"
                )}
              >
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white/30 transition-colors">
                  <MessageCircle className="h-6 w-6 text-white" />
                </div>
                <span className="text-white text-xs font-medium drop-shadow-lg">1.2K</span>
              </button>

              <button
                onClick={() => handleSaveVideo(video)}
                className={cn(
                  "flex flex-col items-center gap-1 transition-all hover:scale-110 active:scale-95",
                  index === currentIndex && "animate-in fade-in-0 slide-in-from-right-5"
                )}
              >
                <div className={cn(
                  "w-12 h-12 rounded-full backdrop-blur-md flex items-center justify-center transition-colors",
                  savedVideos.has(video.id)
                    ? "bg-pink-500/90 hover:bg-pink-500"
                    : "bg-white/20 hover:bg-white/30"
                )}>
                  <Bookmark className={cn(
                    "h-6 w-6",
                    savedVideos.has(video.id) ? "text-white fill-white" : "text-white"
                  )} />
                </div>
                <span className="text-white text-xs font-medium drop-shadow-lg">Save</span>
              </button>

              <button
                className={cn(
                  "flex flex-col items-center gap-1 transition-all hover:scale-110 active:scale-95",
                  index === currentIndex && "animate-in fade-in-0 slide-in-from-right-5"
                )}
              >
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white/30 transition-colors">
                  <Share2 className="h-6 w-6 text-white" />
                </div>
              </button>

              <button
                onClick={toggleMute}
                className={cn(
                  "flex flex-col items-center gap-1 transition-all hover:scale-110 active:scale-95",
                  index === currentIndex && "animate-in fade-in-0 slide-in-from-right-5"
                )}
              >
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white/30 transition-colors">
                  {muted ? (
                    <VolumeX className="h-6 w-6 text-white" />
                  ) : (
                    <Volume2 className="h-6 w-6 text-white" />
                  )}
                </div>
              </button>
            </div>
            
            {/* Bottom Profile Info - Instagram Style */}
            <div className="absolute bottom-20 left-4 right-20 text-white animate-in fade-in-0 slide-in-from-bottom-5">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500 p-[2px]">
                  <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                    <span className="text-xs font-bold">{video.channelTitle.charAt(0)}</span>
                  </div>
                </div>
                <span className="text-sm font-semibold drop-shadow-lg">{video.channelTitle}</span>
              </div>
              <p className="text-sm line-clamp-2 drop-shadow-lg">
                {video.title}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
