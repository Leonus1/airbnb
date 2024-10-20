"use client";

import { GoogleMap, useJsApiLoader, Libraries } from "@react-google-maps/api";
import { useMemo, useEffect, useRef } from "react";

// Define the libraries array with the correct type from the Google Maps library
const libraries: Libraries = ["places"];

export default function Map({ latLong }: { latLong: string }) {
  const [lat, long] = latLong?.split(",");

  const latitude = +lat || 33.38202880108775;
  const longitude = +long || -7.53433757202139;

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
    libraries, // Use the correctly typed libraries array
  });

  const center = useMemo(() => ({ lat: latitude, lng: longitude }), [latitude, longitude]);

  // Ref to hold the map instance
  const mapRef = useRef<google.maps.Map | null>(null);

  useEffect(() => {
    if (isLoaded && mapRef.current) {
      // Initialize the new AdvancedMarkerElement
      const marker = new google.maps.marker.AdvancedMarkerElement({
        position: center,
        map: mapRef.current, // Attach to the map
      });
    }
  }, [isLoaded, center]);

  return (
    <div className="w-full h-96 mt-4 outline-none">
      {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <GoogleMap
          mapContainerClassName="map-container"
          mapTypeId="roadmap"
          center={center}
          zoom={16}
          onLoad={(map) => {
            mapRef.current = map; // Store the map instance
          }}
          options={{
            disableDefaultUI: true, // Optional: Disable default UI for cleaner look
            gestureHandling: "cooperative", // Optional: For better mobile handling
          }}
        />
      )}
    </div>
  );
}
