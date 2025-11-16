import { useState, useCallback } from "react";

export interface YouTubeVideo {
  id: string;
  title: string;
  channelTitle: string;
  thumbnail: string;
}

const PREDEFINED_TOPICS = [
  "python tutorial",
  "javascript crash course",
  "sql basics",
  "machine learning explained",
  "react hooks",
  "data structures algorithms",
  "web development",
  "typescript tutorial",
  "database design",
  "system design",
];

export const useYouTubeSearch = (apiKey: string | null) => {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchVideos = useCallback(async (query: string) => {
    if (!apiKey) {
      setError("API key is required");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
          query + " shorts"
        )}&type=video&videoDuration=short&maxResults=20&key=${apiKey}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch videos");
      }

      const data = await response.json();
      
      const fetchedVideos: YouTubeVideo[] = data.items.map((item: any) => ({
        id: item.id.videoId,
        title: item.snippet.title,
        channelTitle: item.snippet.channelTitle,
        thumbnail: item.snippet.thumbnails.medium.url,
      }));

      setVideos(fetchedVideos);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }, [apiKey]);

  const getRandomTopic = useCallback(() => {
    return PREDEFINED_TOPICS[Math.floor(Math.random() * PREDEFINED_TOPICS.length)];
  }, []);

  return { videos, loading, error, searchVideos, getRandomTopic, PREDEFINED_TOPICS };
};
