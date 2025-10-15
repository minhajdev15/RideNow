import { useEffect, useRef, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, AlertCircle } from 'lucide-react';

interface MapViewProps {
  fromLocation: google.maps.LatLngLiteral | null;
  toLocation: google.maps.LatLngLiteral | null;
  onDistanceCalculated?: (distance: string) => void;
}

const MapView = ({ fromLocation, toLocation, onDistanceCalculated }: MapViewProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const directionsRendererRef = useRef<google.maps.DirectionsRenderer | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize map
  useEffect(() => {
    if (!mapRef.current || !window.google) return;

    mapInstanceRef.current = new google.maps.Map(mapRef.current, {
      center: { lat: 40.7128, lng: -74.006 }, // Default to NYC
      zoom: 13,
      styles: [
        {
          featureType: 'poi',
          elementType: 'labels',
          stylers: [{ visibility: 'off' }],
        },
      ],
    });

    directionsRendererRef.current = new google.maps.DirectionsRenderer({
      map: mapInstanceRef.current,
      suppressMarkers: false,
      polylineOptions: {
        strokeColor: '#3b82f6',
        strokeWeight: 5,
      },
    });
  }, []);

  // Update map when locations change
  useEffect(() => {
    if (!mapInstanceRef.current || !fromLocation || !toLocation) return;

    setIsLoading(true);
    setError(null);

    const directionsService = new google.maps.DirectionsService();

    directionsService.route(
      {
        origin: fromLocation,
        destination: toLocation,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        setIsLoading(false);

        if (status === google.maps.DirectionsStatus.OK && result) {
          directionsRendererRef.current?.setDirections(result);

          // Calculate and display distance
          const route = result.routes[0];
          if (route && route.legs[0]) {
            const distance = route.legs[0].distance?.text || '';
            onDistanceCalculated?.(distance);
          }

          // Fit bounds to show entire route
          const bounds = new google.maps.LatLngBounds();
          bounds.extend(fromLocation);
          bounds.extend(toLocation);
          mapInstanceRef.current?.fitBounds(bounds);
        } else {
          setError('Could not calculate route. Please try different locations.');
          console.error('Directions request failed:', status);
        }
      }
    );
  }, [fromLocation, toLocation, onDistanceCalculated]);

  return (
    <Card className="overflow-hidden shadow-lg">
      <div className="relative">
        {isLoading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/80 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-sm font-medium">Calculating route...</p>
            </div>
          </div>
        )}
        <div ref={mapRef} className="h-[500px] w-full" />
        {error && (
          <div className="absolute bottom-4 left-4 right-4">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          </div>
        )}
      </div>
    </Card>
  );
};

export default MapView;
