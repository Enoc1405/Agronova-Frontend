import React from 'react'
import { MapContainer, TileLayer, FeatureGroup, Polygon, Popup } from 'react-leaflet'
import { EditControl } from "react-leaflet-draw"

const PolygonMap = ({ polygons, handlePolygonCreated, handlePolygonClick, handleDeletePolygon }) => {
  return (
    <MapContainer center={[39.75621, -104.99404]} zoom={13} style={{ height: "100%", width: "100%" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <FeatureGroup>
        <EditControl
          position="topright"
          onCreated={handlePolygonCreated}
          draw={{ rectangle: false, circle: false, circlemarker: false, marker: false, polyline: false }}
        />
        {polygons.map((polygon) => (
          <Polygon
            key={polygon.id}
            positions={polygon.geo_json.geometry.coordinates[0].map(coord => [coord[1], coord[0]])}
            eventHandlers={{ click: () => handlePolygonClick(polygon) }}
          >
            <Popup>
              <div>
                <h3 className="font-bold mb-2">{polygon.name}</h3>
                <button
                  onClick={() => handleDeletePolygon(polygon.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded-md text-sm hover:bg-red-600 transition-colors"
                >
                  Delete
                </button>
              </div>
            </Popup>
          </Polygon>
        ))}
      </FeatureGroup>
    </MapContainer>
  )
}

export default PolygonMap