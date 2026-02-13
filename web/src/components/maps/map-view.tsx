"use client";

import Map, { NavigationControl, Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useState } from "react";
import { MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Default location: Istanbul
const INITIAL_VIEW_STATE = {
    latitude: 41.0082,
    longitude: 28.9784,
    zoom: 12,
};

export function MapView() {
    const [selectedLocation, setSelectedLocation] = useState<{ lat: number, lng: number } | null>(null);

    // Hardcoded example markers
    const markers = [
        { id: 1, lat: 41.0082, lng: 28.9784, title: "Galata Kulesi" },
        { id: 2, lat: 41.0256, lng: 29.0430, title: "Kız Kulesi" },
    ];

    return (
        <div className="relative h-full w-full">
            <Map
                initialViewState={INITIAL_VIEW_STATE}
                style={{ width: "100%", height: "100%" }}
                mapStyle="mapbox://styles/mapbox/dark-v11"
                mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
                attributionControl={false}
            >
                <NavigationControl position="bottom-right" />

                {markers.map((marker) => (
                    <Marker
                        key={marker.id}
                        latitude={marker.lat}
                        longitude={marker.lng}
                        anchor="bottom"
                        onClick={(e) => {
                            e.originalEvent.stopPropagation();
                            setSelectedLocation(marker);
                        }}
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            whileHover={{ scale: 1.2 }}
                            className="group cursor-pointer"
                        >
                            <div className="relative flex items-center justify-center">
                                <div className="absolute h-10 w-10 animate-ping rounded-full bg-purple-500/30" />
                                <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-black/50 backdrop-blur-md border border-purple-500 shadow-xl">
                                    <MapPin className="h-4 w-4 text-purple-400 fill-purple-400" />
                                </div>
                            </div>
                        </motion.div>
                    </Marker>
                ))}

                {selectedLocation && (
                    <Popup
                        latitude={selectedLocation.lat}
                        longitude={selectedLocation.lng}
                        anchor="top"
                        closeButton={false}
                        closeOnClick={true}
                        onClose={() => setSelectedLocation(null)}
                        className="z-50"
                    >
                        <div className="min-w-[150px] p-2">
                            <h3 className="text-sm font-bold text-black">{(selectedLocation as any).title}</h3>
                            <p className="text-xs text-neutral-500">Tıklayarak detaya git</p>
                        </div>
                    </Popup>
                )}
            </Map>
        </div>
    );
}
