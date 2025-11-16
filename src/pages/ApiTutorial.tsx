import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ApiTutorial = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-8 text-foreground hover:bg-muted"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>

        <h1 className="text-4xl font-bold mb-6 text-foreground">
          How to Get a YouTube API Key
        </h1>

        <div className="space-y-8 text-foreground">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Step 1: Go to Google Cloud Console</h2>
            <p className="text-muted-foreground mb-4">
              Visit the Google Cloud Console and sign in with your Google account.
            </p>
            <a
              href="https://console.cloud.google.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary hover:underline"
            >
              Open Google Cloud Console
              <ExternalLink className="h-4 w-4" />
            </a>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Step 2: Create a New Project</h2>
            <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
              <li>Click on the project dropdown at the top</li>
              <li>Click "New Project"</li>
              <li>Give your project a name (e.g., "FocusedLearn")</li>
              <li>Click "Create"</li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Step 3: Enable YouTube Data API v3</h2>
            <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
              <li>In the sidebar, go to "APIs & Services" → "Library"</li>
              <li>Search for "YouTube Data API v3"</li>
              <li>Click on it and press "Enable"</li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Step 4: Create API Credentials</h2>
            <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
              <li>Go to "APIs & Services" → "Credentials"</li>
              <li>Click "Create Credentials" → "API key"</li>
              <li>Copy your newly generated API key</li>
              <li>
                (Optional but recommended) Click "Restrict Key" to limit usage to YouTube Data API
                v3
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Step 5: Use Your API Key</h2>
            <p className="text-muted-foreground mb-4">
              Copy your API key and paste it into FocusedLearn to start watching educational shorts!
            </p>
            <Button onClick={() => navigate("/")} className="bg-primary hover:bg-primary/90">
              Go Back and Enter API Key
            </Button>
          </section>

          <section className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3">Important Notes</h3>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Keep your API key secure and never share it publicly</li>
              <li>YouTube API has a daily quota limit (10,000 units per day for free tier)</li>
              <li>Each search costs approximately 100 units</li>
              <li>If you exceed the quota, wait 24 hours or upgrade your plan</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ApiTutorial;
