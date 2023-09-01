import { useState, useRef, useEffect } from 'react';
import mapboxgl, { Map as MapGl } from 'mapbox-gl';
import './MapBox.css';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN as string;

interface MapBoxProps {
    setNewLat: React.Dispatch<React.SetStateAction<number>>;
    setNewLng: React.Dispatch<React.SetStateAction<number>>;
  }

function MapBox({setNewLng, setNewLat}: MapBoxProps) {
    // Hämta värdet för latitud från sessionStorage och konvertera det till ett tal
    const latitude = parseFloat(sessionStorage.getItem('latitude')?.toString() ?? '') || 0;
    const longitude = parseFloat(sessionStorage.getItem('longitude')?.toString() ?? '') || 0;
  
    const [lat, setLat] = useState<number>(latitude);
    const [lng, setLng] = useState<number>(longitude);
    const [zoom, setZoom] = useState<number>(9);
    const [markers, setMarkers] = useState<mapboxgl.LngLat[]>([]);

    console.log(lat);
    console.log(lng);

    const mapContainer = useRef<HTMLDivElement>(null);
    const mapRef = useRef<MapGl | null>(null);
    const markerRef = useRef<mapboxgl.Marker | null>(null);

  useEffect(() => {
    if (mapRef.current || !mapContainer.current) return;

    mapRef.current = new MapGl({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
      zoom: zoom
    });

    const map: MapGl = mapRef.current;

    if (markerRef.current) {
      markerRef.current.remove();
    }

    markerRef.current = new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map);

    map.on('move', () => {
      const position = map.getCenter();
      setLat(Number(position.lat.toFixed(4)));
      setLng(Number(position.lng.toFixed(4)));
      setZoom(map.getZoom());
    });

    map.on('click', (e) => {
        console.log('Clicked coordinates:', e.lngLat);
        setNewLat(e.lngLat.lat);
        setNewLng(e.lngLat.lng);
        setMarkers([...markers, e.lngLat]);
    });
  }, [lat, lng, zoom, setLat, setLng, setZoom]);

  useEffect(() => {
    if (mapRef.current && markers.length > 0) {
      markers.map((markerCoords) => (
        new mapboxgl.Marker()
          .setLngLat(markerCoords)
          .addTo(mapRef.current as MapGl)
      ));
    }
  }, [markers]);

  return (
    <section className='mapbox'>
      <p>Mapbox</p>
      <div ref={mapContainer} style={{ height: '500px' }} className='map-container'></div>
      <p>Center position: {lat} lat, {lng} long:</p>
    </section>
  );
}

export default MapBox;