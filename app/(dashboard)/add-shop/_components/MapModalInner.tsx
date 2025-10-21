"use client";

import { useState, useEffect, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  Tooltip,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Button } from "@/components/ui/button";

interface InnerMapProps {
  isOpen: boolean;
  onLocationSelect: (
    lat: number,
    lng: number,
    placeName: string | null
  ) => void;
  initialLat: number | null;
  initialLng: number | null;
}

const USA_CENTER = [37.8, -96] as [number, number];
const USA_ZOOM = 4;

// Fix leaflet icons
const defaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = defaultIcon;

export default function MapModalInner({
  isOpen,
  onLocationSelect,
  initialLat,
  initialLng,
}: InnerMapProps) {
  const [selectedPosition, setSelectedPosition] = useState<
    [number, number] | null
  >(null);
  const [placeName, setPlaceName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [mapReady, setMapReady] = useState(false);
  const mapRef = useRef<L.Map | null>(null);

  // Load default marker when modal opens
  useEffect(() => {
    if (isOpen) {
      setSelectedPosition(
        initialLat !== null && initialLng !== null
          ? [initialLat, initialLng]
          : null
      );
      const timer = setTimeout(() => {
        setMapReady(true);
      }, 250);
      return () => clearTimeout(timer);
    } else {
      setMapReady(false);
    }
  }, [isOpen, initialLat, initialLng]);

  // Force leaflet to recalc after open
  useEffect(() => {
    if (mapReady && mapRef.current) {
      setTimeout(() => {
        mapRef.current?.invalidateSize();
      }, 300);
    }
  }, [mapReady]);

  const fetchPlaceName = async (lat: number, lng: number) => {
    try {
      setIsLoading(true);
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );
      const data = await res.json();
      setPlaceName(data?.display_name || "Unknown location");
    } catch (err) {
      setPlaceName("Unknown location");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!selectedPosition) return;
    const timer = setTimeout(() => {
      fetchPlaceName(selectedPosition[0], selectedPosition[1]);
    }, 400);
    return () => clearTimeout(timer);
  }, [selectedPosition]);

  function LocationMarker() {
    useMapEvents({
      click(e) {
        setSelectedPosition([e.latlng.lat, e.latlng.lng]);
      },
    });
    return selectedPosition ? (
      <Marker position={selectedPosition}>
        <Tooltip direction="top" offset={[0, -10]}>
          {isLoading ? "Loading..." : placeName || "Unknown location"}
        </Tooltip>
      </Marker>
    ) : null;
  }

  const handleConfirm = () => {
    if (selectedPosition) {
      onLocationSelect(selectedPosition[0], selectedPosition[1], placeName);
    }
  };

  return (
    <div className="h-[400px] w-full rounded-md overflow-hidden relative">
      {mapReady && (
        <MapContainer
          whenCreated={(map) => (mapRef.current = map)}
          center={selectedPosition || USA_CENTER}
          zoom={selectedPosition ? 13 : USA_ZOOM}
          scrollWheelZoom={true}
          className="h-full w-full"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          />
          <LocationMarker />
        </MapContainer>
      )}

      <div className="absolute bottom-3 right-3">
        <Button
          onClick={handleConfirm}
          disabled={!selectedPosition}
          className="bg-green-600 hover:bg-green-700"
        >
          Confirm Location
        </Button>
      </div>
    </div>
  );
}
