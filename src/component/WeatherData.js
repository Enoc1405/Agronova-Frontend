import React from 'react'

const WeatherData = ({ weatherForecast, weatherCurrent, soilData, uvIndex, error, loading }) => {
  return (
    <div className="space-y-4">
      {loading ? (
        <div className="flex items-center justify-center h-32">
          <svg className="animate-spin h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      ) : error ? (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
          <p className="font-bold">Error</p>
          <p>{error}</p>
        </div>
      ) : (
        <>
          <DataToggle title="Weather Forecast" data={weatherForecast} />
          <DataToggle title="Current Weather" data={weatherCurrent} />
          <DataToggle title="Soil Data" data={soilData} />
          <DataToggle title="UV Index" data={uvIndex} />
        </>
      )}
    </div>
  )
}

const DataToggle = ({ title, data }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden">
    <button
      className="w-full px-4 py-2 text-left font-semibold bg-gray-200 hover:bg-gray-300 transition-colors"
      onClick={() => document.getElementById(title).classList.toggle('hidden')}
    >
      {title}
    </button>
    <div id={title} className="hidden p-4">
      <pre className="text-sm overflow-x-auto">{JSON.stringify(data, null, 2)}</pre>
    </div>
  </div>
)

export default WeatherData