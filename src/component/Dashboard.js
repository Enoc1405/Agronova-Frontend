'use client'

import React, { useState, useEffect } from 'react'
import { MapContainer, TileLayer, FeatureGroup, Polygon, Popup, ImageOverlay } from 'react-leaflet'
import { EditControl } from "react-leaflet-draw"
import axios from 'axios'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-draw/dist/leaflet.draw.css'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png',
})

const API_URL = 'http://127.0.0.1:8000/api/polygons'
const WEATHER_FORECAST_URL = 'http://127.0.0.1:8000/api/weather/forecast'
const WEATHER_CURRENT_URL = 'http://127.0.0.1:8000/api/weather/current'
const SOIL_DATA_URL = 'http://127.0.0.1:8000/api/soil'
const UV_INDEX_URL = 'http://127.0.0.1:8000/api/uv?polyid=6712e4f84026351cc92ed243'
const SATELLITE_IMAGES_URL = 'http://127.0.0.1:8000/api/polygons/6712e4f84026351cc92ed243/satellite-images'

function WeatherCard({ title, data, type }) {
  const [isOpen, setIsOpen] = useState(false)

  const formatDate = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleString('es-NI', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    })
  }

  const kelvinToCelsius = (kelvin) => {
    return (kelvin - 273.15).toFixed(1)
  }

  const renderContent = () => {
    if (!data) return <p className="text-sm text-gray-500">No hay datos disponibles.</p>

    switch (type) {
      case 'forecast':
        return (
          <div className="space-y-4">
            {data.map((item, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-semibold text-sm mb-2">{formatDate(item.dt)}</h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <p className="text-gray-600">Temperatura</p>
                    <p className="font-medium">{kelvinToCelsius(item.main.temp)}°C</p>
                    <p className="text-gray-500">
                      Mín: {kelvinToCelsius(item.main.temp_min)}°C, 
                      Máx: {kelvinToCelsius(item.main.temp_max)}°C
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Clima</p>
                    <p className="font-medium">{item.weather[0].description}</p>
                    <img 
                      src={`http://openweathermap.org/img/wn/${item.weather[0].icon}.png`} 
                      alt={item.weather[0].description}
                      className="w-8 h-8"
                    />
                  </div>
                  <div>
                    <p className="text-gray-600">Viento</p>
                    <p className="font-medium">{item.wind.speed} m/s</p>
                    <p className="text-gray-500">Dirección: {item.wind.deg}°</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Humedad</p>
                    <p className="font-medium">{item.main.humidity}%</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
      case 'current':
        return (
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h4 className="font-semibold text-sm mb-2">Clima Actual</h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <p className="text-gray-600">Temperatura</p>
                <p className="font-medium">{kelvinToCelsius(data.main.temp)}°C</p>
              </div>
              <div>
                <p className="text-gray-600">Clima</p>
                <p className="font-medium">{data.weather[0].description}</p>
                <img 
                  src={`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`} 
                  alt={data.weather[0].description}
                  className="w-8 h-8"
                />
              </div>
              <div>
                <p className="text-gray-600">Viento</p>
                <p className="font-medium">{data.wind.speed} m/s</p>
                <p className="text-gray-500">Dirección: {data.wind.deg}°</p>
              </div>
              <div>
                <p className="text-gray-600">Humedad</p>
                <p className="font-medium">{data.main.humidity}%</p>
              </div>
            </div>
          </div>
        )
      case 'soil':
        return (
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h4 className="font-semibold text-sm mb-2">Datos del Suelo</h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <p className="text-gray-600">Humedad del suelo</p>
                <p className="font-medium">{data.moisture}%</p>
              </div>
              <div>
                <p className="text-gray-600">pH del suelo</p>
                <p className="font-medium">{data.ph}</p>
              </div>
              <div>
                <p className="text-gray-600">Temperatura del suelo</p>
                <p className="font-medium">{data.temperature}°C</p>
              </div>
              <div>
                <p className="text-gray-600">Conductividad eléctrica</p>
                <p className="font-medium">{data.conductivity} μS/cm</p>
              </div>
            </div>
          </div>
        )
      case 'uv':
        return (
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h4 className="font-semibold text-sm mb-2">Índice UV</h4>
            <p className="font-medium text-lg">{data.value}</p>
            <p className="text-xs text-gray-600">{data.risk_level}</p>
          </div>
        )
      default:
        return <p className="text-sm text-gray-500">Tipo de datos no reconocido.</p>
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-300 ease-in-out mb-4">
      <button
        className="w-full px-4 py-3 text-left font-semibold bg-gray-50 text-gray-800 hover:bg-gray-100 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex justify-between items-center">
          <span className="text-sm">{title}</span>
          <svg
            className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>
      </button>
      {isOpen && (
        <div className="p-4 bg-white">
          {renderContent()}
        </div>
      )}
    </div>
  )
}

function SatelliteImageViewer({ satelliteData, onSelectImage }) {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-4">
      <h2 className="text-sm font-semibold p-4 bg-gray-50 text-gray-800">Imágenes Satelitales</h2>
      <div className="p-4">
        {satelliteData.map((item, index) => (
          <div key={index} className="mb-4 pb-4 border-b border-gray-200 last:border-b-0 last:pb-0">
            <h3 className="text-xs font-semibold mb-2">Fecha: {new Date(item.dt * 1000).toLocaleDateString()}</h3>
            <p className="text-xs text-gray-600 mb-1">Tipo: {item.type}</p>
            <p className="text-xs text-gray-600 mb-2">Cobertura de nubes: {item.cl}%</p>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(item.image).map(([key, value]) => (
                <button
                  key={key}
                  onClick={() => onSelectImage(value, item)}
                  className="bg-blue-500 text-white py-1 px-2 rounded text-xs hover:bg-blue-600 transition duration-300"
                >
                  Ver {key}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Component() {
  const [polygons, setPolygons] = useState([])
  const [polygonName, setPolygonName] = useState('')
  const [selectedPolygon, setSelectedPolygon] = useState(null)
  const [weatherForecast, setWeatherForecast] = useState(null)
  const [weatherCurrent, setWeatherCurrent] = useState(null)
  const [soilData, setSoilData] = useState(null)
  const [uvIndex, setUVIndex] = useState(null)
  const [satelliteData, setSatelliteData] = useState([])
  const [selectedSatelliteImage, setSelectedSatelliteImage] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [instructions, setInstructions] = useState(true)

  useEffect(() => {
    fetchPolygons()
    fetchSatelliteImages()
  }, [])

  const fetchPolygons = async () => {
    try {
      const response = await axios.get(API_URL)
      setPolygons(response.data)
    } catch (error) {
      console.error('Error al obtener polígonos:', error)
      setError('Error al cargar los polígonos. Por favor, intente de nuevo más tarde.')
    }
  }

  const fetchSatelliteImages = async () => {
    try {
      const response = await axios.get(`${SATELLITE_IMAGES_URL}?start=1659312000&end=1662057600`)
      setSatelliteData(response.data)
    } catch (error) {
      console.error('Error al obtener imágenes satelitales:', error)
      setError('Error al cargar las imágenes satelitales. Por favor, intente de nuevo más tarde.')
    }
  }

  const fetchWeatherData = async (lat, lon) => {
    setLoading(true)
    setError(null)
    try {
      const [forecastRes, currentRes] = await Promise.all([
        axios.get(`${WEATHER_FORECAST_URL}?lat=${lat}&lon=${lon}`),
        axios.get(`${WEATHER_CURRENT_URL}?lat=${lat}&lon=${lon}`)
      ])
      setWeatherForecast(forecastRes.data)
      setWeatherCurrent(currentRes.data)
    } catch (err) {
      setError('Error al cargar los datos meteorológicos. Por favor, intente de nuevo más tarde.')
      console.error('Error al obtener datos meteorológicos:', err)
    } finally {
      setLoading(false)
    }
  }

  const fetchSoilData = async (polygonId) => {
    try {
      const response = await axios.get(`${SOIL_DATA_URL}/${polygonId}`)
      setSoilData(response.data)
    } catch (error) {
      console.error('Error al obtener datos del suelo:', error)
      setError('Error al cargar los datos del suelo. Por favor, intente de nuevo más tarde.')
    }
  }

  const fetchUVIndex = async (lat, lon) => {
    try {
      const response = await axios.get(`${UV_INDEX_URL}?`)
      setUVIndex(response.data)
    } catch (error) {
      console.error('Error al obtener índice UV:', error)
      setUVIndex({ value: 'N/A', risk_level: 'Datos no disponibles' })
    }
  }

  const handlePolygonCreated = (e) => {
    const { layer } = e
    const geoJSON = layer.toGeoJSON()
    setSelectedPolygon({ geometry: geoJSON.geometry })
  }

  const handlePolygonClick = (polygon) => {
    setSelectedPolygon(polygon)
    setPolygonName(polygon.name)
    
    const [lon, 
    lat] = polygon.geo_json.geometry.coordinates[0][0]
    fetchWeatherData(lat, lon)
    fetchSoilData(polygon.id)
    fetchUVIndex(lat, lon)
  }

  const handleSavePolygon = async () => {
    if (!selectedPolygon || !polygonName) return
    const polygonData = {
      name: polygonName,
      geo_json: {
        type: "Feature",
        geometry: selectedPolygon.geometry,
        properties: {
          description: `Polígono llamado ${polygonName}`
        }
      }
    }
    try {
      await axios.post(API_URL, polygonData)
      setPolygonName('')
      setSelectedPolygon(null)
      fetchPolygons()
    } catch (error) {
      console.error('Error al guardar polígono:', error)
      setError('Error al guardar el polígono. Por favor, intente de nuevo.')
    }
  }

  const handleUpdatePolygon = async (id) => {
    if (!polygonName) return
    const polygonData = { name: polygonName }
    try {
      await axios.put(`${API_URL}/${id}`, polygonData)
      setPolygonName('')
      setSelectedPolygon(null)
      fetchPolygons()
    } catch (error) {
      console.error('Error al actualizar polígono:', error)
      setError('Error al actualizar el polígono. Por favor, intente de nuevo.')
    }
  }

  const handleDeletePolygon = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`)
      fetchPolygons()
    } catch (error) {
      console.error('Error al eliminar polígono:', error)
      setError('Error al eliminar el polígono. Por favor, intente de nuevo.')
    }
  }

  const handleSelectSatelliteImage = (imageUrl, imageData) => {
    setSelectedSatelliteImage({ url: imageUrl, data: imageData })
  }

  return (
    <div className="h-screen flex flex-col md:flex-row bg-gray-100">
      <div className="md:w-1/3 p-4 overflow-y-auto bg-white shadow-md">
        {instructions && (
          <div className="bg-blue-50 border-l-4 border-blue-500 text-blue-700 p-4 mb-6 rounded-lg" role="alert">
            <h4 className="font-bold mb-2 text-sm">Instrucciones de uso:</h4>
            <ol className="list-decimal list-inside space-y-1 text-xs">
              <li>Dibuja un polígono en el mapa usando la herramienta de dibujo en la esquina superior derecha.</li>
              <li>Ingresa un nombre para el polígono y haz clic en "Guardar Polígono".</li>
              <li>Haz clic en un polígono existente para ver los datos meteorológicos, del suelo y el índice UV para esa área.</li>
              <li>Puedes actualizar el nombre de un polígono seleccionándolo y usando el botón "Actualizar Polígono".</li>
              <li>Para eliminar un polígono, haz clic en él y usa el botón "Eliminar" en la ventana emergente.</li>
              <li>Desplázate hacia abajo para ver las imágenes satelitales disponibles y selecciona una para verla en el polígono seleccionado.</li>
            </ol>
            <button 
              className="mt-4 text-xs underline"
              onClick={() => setInstructions(false)}
            >
              Ocultar instrucciones
            </button>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <h2 className="text-lg font-bold mb-4 text-gray-800">Gestión de Polígonos</h2>
          <input
            type="text"
            value={polygonName}
            onChange={(e) => setPolygonName(e.target.value)}
            placeholder="Ingrese el nombre del polígono"
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex space-x-2">
            <button
              onClick={handleSavePolygon}
              className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Guardar Polígono
            </button>
            {selectedPolygon && selectedPolygon.id && (
              <button
                onClick={() => handleUpdatePolygon(selectedPolygon.id)}
                className="flex-1 bg-green-500 text-white px-4 py-2 rounded-md text-sm hover:bg-green-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
              >
                Actualizar Polígono
              </button>
            )}
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-lg" role="alert">
            <p className="font-bold text-sm">Error</p>
            <p className="text-xs">{error}</p>
          </div>
        ) : (
          <div className="space-y-4">
            <WeatherCard title="Pronóstico del Tiempo" data={weatherForecast} type="forecast" />
            <WeatherCard title="Clima Actual" data={weatherCurrent} type="current" />
            <WeatherCard title="Datos del Suelo" data={soilData} type="soil" />
            <WeatherCard title="Índice UV" data={uvIndex} type="uv" />
            <SatelliteImageViewer satelliteData={satelliteData} onSelectImage={handleSelectSatelliteImage} />
          </div>
        )}
      </div>

      <div className="flex-1">
        <MapContainer
          center={[12.1328, -86.2504]} // Managua, Nicaragua
          zoom={8}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
          />
          <FeatureGroup>
            <EditControl
              position="topright"
              onCreated={handlePolygonCreated}
              draw={{
                rectangle: false,
                circle: false,
                circlemarker: false,
                marker: false,
                polyline: false,
              }}
            />
            {polygons.map((polygon) => (
              <Polygon
                key={polygon.id}
                positions={polygon.geo_json.geometry.coordinates[0].map(coord => [coord[1], coord[0]])}
                eventHandlers={{
                  click: () => handlePolygonClick(polygon),
                }}
              >
                <Popup>
                  <div className="p-2">
                    <h3 className="font-bold mb-2 text-sm">{polygon.name}</h3>
                    <button
                      onClick={() => handleDeletePolygon(polygon.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-md text-xs hover:bg-red-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                    >
                      Eliminar
                    </button>
                  </div>
                </Popup>
                {selectedSatelliteImage && selectedPolygon && selectedPolygon.id === polygon.id && (
                  <ImageOverlay
                    bounds={polygon.geo_json.geometry.coordinates[0].map(coord => [coord[1], coord[0]])}
                    url={selectedSatelliteImage.url}
                    opacity={0.8}
                  />
                )}
              </Polygon>
            ))}
          </FeatureGroup>
        </MapContainer>
      </div>
    </div>
  )
}