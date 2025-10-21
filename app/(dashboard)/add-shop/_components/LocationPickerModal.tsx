"use client";

import dynamic from "next/dynamic";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import L from "leaflet";

// Dynamically import react-leaflet components (avoid SSR crash)
const MapContainer = dynamic(() => import("react-leaflet").then((m) => m.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then((m) => m.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then((m) => m.Marker), { ssr: false });

// ⚡ Important: must import hooks in the same dynamic call
const useMapEvents = dynamic(() => import("react-leaflet").then((m) => m.useMapEvents), { ssr: false });

// Fix Leaflet marker icons
const defaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
(L.Marker as any).prototype.options.icon = defaultIcon;

interface LocationPickerModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (lat: number, lng: number) => void;
  initialPosition?: [number, number];
}

/* ----------------------------- Component ----------------------------- */
export function LocationPickerModal({
  open,
  onOpenChange,
  onSelect,
  initialPosition = [23.8103, 90.4125],
}: LocationPickerModalProps) {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [showMap, setShowMap] = useState(false);
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      const timer = setTimeout(() => setShowMap(true), 100);
      return () => clearTimeout(timer);
    } else {
      document.body.style.overflow = "auto";
      setShowMap(false);
    }
  }, [open]);

  useEffect(() => {
    if (showMap && mapRef.current) {
      const t = setTimeout(() => mapRef.current?.invalidateSize(), 150);
      return () => clearTimeout(t);
    }
  }, [showMap]);

  /* 🧭 Handle map click — fix for no marker showing */
  function LocationMarker() {
    // Instead of using dynamic hook variable, use inline hook logic
    const { useMapEvents } = require("react-leaflet"); // ✅ ensures hook runs inside component
    useMapEvents({
      click(e: any) {
        setPosition([e.latlng.lat, e.latlng.lng]);
      },
    });

    return position ? <Marker position={position} /> : null;
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-lg w-[92%] max-w-4xl p-4 relative">
        {/* Header */}
        <div className="mb-3">
          <h2 className="text-lg font-semibold">Select Location on Map</h2>
          <p className="text-xs text-muted-foreground">
            Click anywhere on the map to drop a pin. Confirm to use the selected coordinates.
          </p>
        </div>

        {/* Map */}
        <div className="h-[500px] w-full rounded-md overflow-hidden relative">
          {showMap && (
            <MapContainer
              whenCreated={(mapInstance) => (mapRef.current = mapInstance)}
              center={initialPosition}
              zoom={5}
              minZoom={2}
              maxZoom={18}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
              />
              <LocationMarker />
            </MapContainer>
          )}

          {/* 🧭 Show lat/lng live after click */}
          {position && (
            <div className="absolute bottom-3 left-3 bg-white p-2 rounded-md shadow-md text-sm">
              <p>
                <strong>Latitude:</strong> {position[0].toFixed(6)} <br />
                <strong>Longitude:</strong> {position[1].toFixed(6)}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center gap-2 mt-4">
          {position && (
            <p className="text-sm text-gray-600">
              Selected: {position[0].toFixed(6)}, {position[1].toFixed(6)}
            </p>
          )}
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                if (position) {
                  onSelect(position[0], position[1]);
                  onOpenChange(false);
                }
              }}
              disabled={!position}
            >
              Confirm
            </Button>
          </div>
        </div>

        <button
          onClick={() => onOpenChange(false)}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
        >
          ×
        </button>
      </div>
    </div>
  );
}
