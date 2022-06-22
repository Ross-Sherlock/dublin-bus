import './Map.css'
import React from 'react'
import { ReactNode, useEffect, useRef, ReactElement, useState } from 'react'

function Map({
  center,
  zoom,
  children,
}: {
  center: google.maps.LatLngLiteral
  zoom: number
  children: ReactNode
}) {
  const ref = useRef<HTMLDivElement>()
  const [map, setMap] = useState<google.maps.Map | null>(null)

  useEffect(() => {
    setMap(new window.google.maps.Map(ref.current!, {}))
  }, [])

  if (map) {
    map.setCenter(center)
    map.setZoom(zoom)
  }

  return (
    <div ref={ref} className="map_container">
      {React.Children.map(children, (child: ReactElement) =>
        React.cloneElement(child, { map })
      )}
    </div>
  )
}

export default Map
