"use client"

import AutocompleteInput from "@/components/AutoCompleteInput";
import GoogleMapsLoader from "@/components/GoogleMapsLoader";
import MapView from "@/components/MapView";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, MapPin, Navigation } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";


// Get your key from: https://console.cloud.google.com/google/maps-apis
const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
console.log("API Key:", GOOGLE_MAPS_API_KEY);

export default function Home() {
    const [fromAddress, setFromAddress] = useState('');
  const [toAddress, setToAddress] = useState('');
  const [fromLocation, setFromLocation] = useState<google.maps.LatLngLiteral | null>(null);
  const [toLocation, setToLocation] = useState<google.maps.LatLngLiteral | null>(null);
  const [distance, setDistance] = useState<string>('');

  const handleFromPlaceSelected = (place: google.maps.places.PlaceResult) => {
    if (place.geometry?.location) {
      setFromLocation({
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      });
    }
  };

  const handleToPlaceSelected = (place: google.maps.places.PlaceResult) => {
    if (place.geometry?.location) {
      setToLocation({
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      });
    }
  };

  const handleShowRoute = () => {
    // Route will be calculated automatically when both locations are set
    if (!fromLocation || !toLocation) {
      toast.error('Please select both pickup and dropoff locations');
    }
  };

  const hasRoute = fromLocation && toLocation;

  return (
    <GoogleMapsLoader apiKey={GOOGLE_MAPS_API_KEY!}>
      <div className="min-h-screen bg-gradient-hero">
        {/* Header */}
        <header className="border-b bg-card/50 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-primary">
                <Navigation className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold">RideNow</h1>
                <p className="text-xs text-muted-foreground">Smart ride planning</p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          <div className="mx-auto max-w-5xl space-y-6">
            {/* Location Selection Card */}
            <Card className="shadow-xl">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl">Plan Your Ride</CardTitle>
                    <CardDescription className="mt-1">
                      Enter your pickup and dropoff locations to see the route
                    </CardDescription>
                  </div>
                  {distance && (
                    <Badge variant="secondary" className="text-sm font-semibold">
                      {distance}
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <AutocompleteInput
                    id="from"
                    label="Pickup Location"
                    value={fromAddress}
                    onChange={setFromAddress}
                    onPlaceSelected={handleFromPlaceSelected}
                    placeholder="Enter pickup address..."
                    icon={<MapPin className="h-4 w-4 text-primary" />}
                  />
                  <AutocompleteInput
                    id="to"
                    label="Dropoff Location"
                    value={toAddress}
                    onChange={setToAddress}
                    onPlaceSelected={handleToPlaceSelected}
                    placeholder="Enter dropoff address..."
                    icon={<MapPin className="h-4 w-4 text-accent" />}
                  />
                </div>

                <Button
                  onClick={handleShowRoute}
                  disabled={!fromAddress || !toAddress}
                  className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
                  size="lg"
                >
                  Show Route
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            {/* Map Display */}
            {hasRoute && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <MapView
                  fromLocation={fromLocation}
                  toLocation={toLocation}
                  onDistanceCalculated={setDistance}
                />
              </div>
            )}

            {/* Instructions when no route */}
            {!hasRoute && (
              <Card className="border-dashed">
                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="rounded-full bg-muted p-4 mb-4">
                    <MapPin className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Ready to Plan Your Ride?</h3>
                  <p className="text-sm text-muted-foreground max-w-sm">
                    Select your pickup and dropoff locations above to see the route, estimated
                    distance, and travel time on the map.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </main>
      </div>
    </GoogleMapsLoader>
  );
}
