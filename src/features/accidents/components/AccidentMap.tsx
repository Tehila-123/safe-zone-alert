import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Accident } from "../context/AccidentContext";
import { useEffect } from "react";

// Fix for default marker icons in Leaflet with Webpack/Vite
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIconRetina from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
    iconUrl: markerIcon,
    iconRetinaUrl: markerIconRetina,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

interface AccidentMapProps {
    accidents: Accident[];
    center?: [number, number];
    zoom?: number;
    highlightedId?: number;
}

// Helper component to center the map when props change
const RecenterMap = ({ center, zoom }: { center: [number, number]; zoom: number }) => {
    const map = useMap();
    useEffect(() => {
        map.setView(center, zoom);
    }, [center, zoom, map]);
    return null;
};

const AccidentMap = ({
    accidents,
    center = [-1.9441, 30.0619], // Default to Kigali
    zoom = 13,
    highlightedId
}: AccidentMapProps) => {

    const parseCoordinates = (coordStr: string): [number, number] => {
        const [lat, lng] = coordStr.split(",").map(c => parseFloat(c.trim()));
        return [lat, lng];
    };

    return (
        <MapContainer
            center={center}
            zoom={zoom}
            className="h-full w-full rounded-xl z-0"
            scrollWheelZoom={true}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <RecenterMap center={center} zoom={zoom} />
            {accidents.map((accident) => {
                const position = parseCoordinates(accident.coordinates);
                return (
                    <Marker
                        key={accident.id}
                        position={position}
                        opacity={highlightedId === accident.id ? 1 : 0.7}
                    >
                        <Popup>
                            <div className="p-1">
                                <p className="font-bold text-destructive">Accident #{accident.id}</p>
                                <p className="text-sm">{accident.location}</p>
                                <p className="text-xs text-muted-foreground">{accident.time}</p>
                                <p className="text-xs font-semibold mt-1">Status: {accident.status}</p>
                            </div>
                        </Popup>
                    </Marker>
                );
            })}
        </MapContainer>
    );
};

export default AccidentMap;
