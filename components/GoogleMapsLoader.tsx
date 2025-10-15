import { useEffect, useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, Key } from 'lucide-react';

interface GoogleMapsLoaderProps {
  apiKey: string;
  children: React.ReactNode;
}

const GoogleMapsLoader = ({ apiKey, children }: GoogleMapsLoaderProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!apiKey) {
      setError('Google Maps API key is missing');
      return;
    }

    // Check if already loaded
    if (window.google?.maps) {
      setIsLoaded(true);
      return;
    }

    // Create script tag
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&loading=async`;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      setIsLoaded(true);
    };

    script.onerror = () => {
      setError('Failed to load Google Maps. Please check your API key and internet connection.');
    };

    document.head.appendChild(script);

    return () => {
      // Cleanup script on unmount
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [apiKey]);

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-hero p-4">
        <Alert variant="destructive" className="max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error Loading Maps</AlertTitle>
          <AlertDescription className="mt-2">
            {error}
            <div className="mt-4 rounded-md bg-destructive-foreground/10 p-3">
              <p className="text-xs font-medium flex items-center gap-2">
                <Key className="h-3 w-3" />
                Add your Google Maps API Key
              </p>
              <p className="mt-2 text-xs opacity-90">
                Set your API key in <code className="bg-background/20 px-1 py-0.5 rounded">src/pages/Index.tsx</code>
              </p>
            </div>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-hero">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent" />
          <p className="mt-4 text-sm font-medium text-muted-foreground">Loading Google Maps...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default GoogleMapsLoader;
