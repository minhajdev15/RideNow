import { useEffect, useRef, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MapPin } from 'lucide-react';

interface AutocompleteInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  onPlaceSelected: (place: google.maps.places.PlaceResult) => void;
  placeholder?: string;
  icon?: React.ReactNode;
}

const AutocompleteInput = ({
  id,
  label,
  value,
  onChange,
  onPlaceSelected,
  placeholder,
  icon,
}: AutocompleteInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const [isGoogleLoaded, setIsGoogleLoaded] = useState(false);

  // Check if Google Maps API is loaded
  useEffect(() => {
    const checkGoogleMaps = () => {
      if (window.google?.maps?.places?.Autocomplete) {
        setIsGoogleLoaded(true);
      } else {
        // Retry after a short delay
        setTimeout(checkGoogleMaps, 100);
      }
    };

    checkGoogleMaps();
  }, []);

  useEffect(() => {
    if (!inputRef.current || !isGoogleLoaded || !window.google?.maps?.places?.Autocomplete) return;

    // Check if PlaceAutocompleteElement is available (new API)
    if (window.google?.maps?.places?.PlaceAutocompleteElement) {
      // Use new API when available
      console.warn('Using deprecated Autocomplete API. Consider upgrading to PlaceAutocompleteElement for new projects.');
    }

    // Initialize Google Places Autocomplete (keeping current implementation)
    autocompleteRef.current = new google.maps.places.Autocomplete(inputRef.current, {
      types: ['geocode'],
      fields: ['formatted_address', 'geometry', 'name'],
    });

    // Listen for place selection
    autocompleteRef.current.addListener('place_changed', () => {
      const place = autocompleteRef.current?.getPlace();
      if (place && place.geometry) {
        onPlaceSelected(place);
        onChange(place.formatted_address || place.name || '');
      }
    });

    return () => {
      if (autocompleteRef.current) {
        google.maps.event.clearInstanceListeners(autocompleteRef.current);
      }
    };
  }, [isGoogleLoaded, onPlaceSelected, onChange]);

  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-sm font-medium">
        {label}
      </Label>
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
          {icon || <MapPin className="h-4 w-4" />}
        </div>
        <Input
          ref={inputRef}
          id={id}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="pl-10 transition-all focus:ring-2 focus:ring-primary"
        />
      </div>
    </div>
  );
};

export default AutocompleteInput;
