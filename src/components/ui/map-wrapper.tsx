import * as React from "react"
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet"
import L from "leaflet"
import { cn } from "@/lib/utils"

export interface MapPinItem {
  id: string
  lat: number
  lng: number
  title: string
  subtitle?: string
  type: "ambulance" | "hospital" | "caller" | "volunteer" | "resource"
  status?: "ready" | "watch" | "critical"
  resourceType?: "aed" | "oxygen" | "blood"
}

interface MapWrapperProps {
  center: [number, number]
  zoom?: number
  pins?: MapPinItem[]
  routePolyline?: [number, number][]
  silenceCircle?: {
    center: [number, number]
    radiusMeters: number
  }
  className?: string
  height?: string | number
  onMapClick?: (lat: number, lng: number) => void
}

// Custom DivIcons according to Section 5.8
const createCustomIcon = (pin: MapPinItem) => {
  let bgColor = "bg-navy-700"
  let iconSvg = ""

  switch (pin.type) {
    case "ambulance":
      bgColor = "bg-red-600"
      iconSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 10H6"/><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.28a1 1 0 0 0-.684-.948l-1.923-.641a1 1 0 0 1-.578-.502l-1.539-3.076A1 1 0 0 0 16.382 8H14"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/></svg>`
      break
    case "hospital":
      bgColor =
        pin.status === "ready"
          ? "bg-green-600"
          : pin.status === "watch"
          ? "bg-amber-500"
          : "bg-navy-700"
      iconSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 6v4"/><path d="M14 14h-4"/><path d="M14 18h-4"/><path d="M14 8h-4"/><path d="M18 12h2a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2h2"/><path d="M18 22V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v18"/></svg>`
      break
    case "caller":
      bgColor = "bg-navy-900"
      iconSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></svg>`
      break
    case "volunteer":
      bgColor = "bg-teal-500"
      iconSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><polyline points="16 11 18 13 22 9"/></svg>`
      break
    case "resource":
      bgColor = "bg-blue-600"
      iconSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>`
      break
  }

  return L.divIcon({
    className: "custom-leaflet-marker",
    html: `<div class="${bgColor} h-8 w-8 rounded-full border-2 border-white shadow-e2 flex items-center justify-center transform hover:scale-110 transition-transform">${iconSvg}</div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16],
  })
}

export const MapWrapper: React.FC<MapWrapperProps> = ({
  center,
  zoom = 14,
  pins = [],
  routePolyline = [],
  className,
  height = "320px",
}) => {
  return (
    <div
      className={cn("relative w-full rounded-card overflow-hidden border border-border shadow-e1", className)}
      style={{ height }}
    >
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={false}
        className="w-full h-full z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {routePolyline.length > 0 && (
          <Polyline
            positions={routePolyline}
            pathOptions={{ color: "#12244A", weight: 4, dashArray: "6, 6", opacity: 0.85 }}
          />
        )}

        {pins.map((pin) => (
          <Marker
            key={pin.id}
            position={[pin.lat, pin.lng]}
            icon={createCustomIcon(pin)}
          >
            <Popup className="custom-popup">
              <div className="p-1 text-navy-700">
                <div className="font-bold text-small">{pin.title}</div>
                {pin.subtitle && <div className="text-micro text-text-muted">{pin.subtitle}</div>}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}
