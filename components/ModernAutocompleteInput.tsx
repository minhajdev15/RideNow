import { useEffect, useRef } from 'react';
import { Label } from '@/components/ui/label';
import { MapPin } from 'lucide-react';

interface ModernAutocompleteInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  onPlaceSelected: (place: google.maps.places.PlaceResult) => void;
  placeholder?: string;
  icon?: React.ReactNode;
  className?: string;
}

const ModernAutocompleteInput = ({
  id,
  label,
  value,
  onChange,
  onPlaceSelected,
  placeholder,
  icon,
  className,
}: ModernAutocompleteInputProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !window.google?.maps?.places?.PlaceAutocompleteElement) return;

    // Create the new PlaceAutocompleteElement
    const autocompleteElement = document.createElement('gmp-place-autocomplete') as any;
    
    // Set attributes
    autocompleteElement.setAttribute('id', id);
    autocompleteElement.setAttribute('placeholder', placeholder || 'Enter a location');
    autocompleteElement.setAttribute('types', 'geocode');
    
    // Apply styling to match shadcn/ui input
    autocompleteElement.style.cssText = `
      display: flex;
      height: 2.5rem;
      width: 100%;
      border-radius: 0.375rem;
      border: 1px solid hsl(var(--border));
      background-color: hsl(var(--background));
      padding-left: 2.5rem;
      padding-right: 0.75rem;
      padding-top: 0.5rem;
      padding-bottom: 0.5rem;
      font-size: 0.875rem;
      line-height: 1.25rem;
      transition: all 0.2s;
      ${className || ''}
    `;

    // Listen for place selection
    autocompleteElement.addEventListener('gmp-placeselect', (event: any) => {
      const newPlace = event.place;
      if (newPlace) {
        // Convert new Place format to legacy PlaceResult format for compatibility
        const legacyPlace: google.maps.places.PlaceResult = {
          formatted_address: newPlace.formattedAddress || newPlace.displayName,
          name: newPlace.displayName,
          place_id: newPlace.id,
          geometry: newPlace.location ? {
            location: newPlace.location
          } : undefined,
        };
        
        // Update the input value
        const address = newPlace.formattedAddress || newPlace.displayName || '';
        onChange(address);
        onPlaceSelected(legacyPlace);
      }
    });

    // Listen for manual input changes
    autocompleteElement.addEventListener('input', (event: any) => {
      onChange(event.target.value);
    });

    // Clear container and append the new element
    containerRef.current.innerHTML = '';
    containerRef.current.appendChild(autocompleteElement);

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [id, placeholder, onPlaceSelected, onChange, className]);

  // Synchronize value prop with the element
  useEffect(() => {
    const element = containerRef.current?.querySelector('gmp-place-autocomplete') as any;
    if (element && element.value !== value) {
      element.value = value;
    }
  }, [value]);

  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-sm font-medium">
        {label}
      </Label>
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground z-10">
          {icon || <MapPin className="h-4 w-4" />}
        </div>
        <div ref={containerRef} className="relative" />
      </div>
    </div>
  );
};

export default ModernAutocompleteInput;