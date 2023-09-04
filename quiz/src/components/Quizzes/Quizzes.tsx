import './Quizzes.css';
import { Quiz, Quizzes } from '../../interfaces';
import { getAllQuizzes } from '../../Api/getAllquizzes';
import { useState, useEffect, useRef } from 'react';
import mapboxgl, { Map as MapGl } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN as string;

function Quizzes() {
  const [quizzes, setQuizzes] = useState<Quiz[] | null>([]);
  const [selectedCoords, setSelectedCoords] = useState<{ latitude: number; longitude: number }[]>([]);
  const [markers, setMarkers] = useState<mapboxgl.LngLat[]>([]);

  const mapRef = useRef<MapGl | null>(null);
  const markerRef = useRef<mapboxgl.Marker | null>(null)
  const mapContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const data: Quizzes = await getAllQuizzes();
        setQuizzes(data.quizzes);
        console.log(quizzes);
      } catch (error) {
        console.error('Error fetching quizzes:', error);
      }
    };

    fetchQuizzes();
  }, []);

  useEffect(() => {
    if (!mapContainer.current || selectedCoords.length === 0) return;

    mapRef.current = new MapGl({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [selectedCoords[0].longitude, selectedCoords[0].latitude],
      zoom: 7,
    });

    if(markerRef.current){
      markerRef.current.remove()
    }

    selectedCoords.forEach((coords) => {
      new mapboxgl.Marker({color: '#FFFFFFF'})
      .setLngLat([coords.longitude, coords.latitude])
      .addTo(mapRef.current as MapGl);
      setMarkers(markers);
      console.log(coords.longitude, coords.latitude)
    });

  }, [selectedCoords]);

  

  return (
    <div>
      <div ref={mapContainer} style={{ height: '500px' }} ></div>

      <h2>Quizzes</h2>
      
      {quizzes ? (
        <ul>
          {quizzes.map((quiz, index) => (
            <li
              className='quizzes'
              key={index}
              onClick={() => {
                const coords = quiz.questions.map((question) => ({
                  latitude: parseFloat(question.location.latitude),
                  longitude: parseFloat(question.location.longitude),
                }));
                setSelectedCoords(coords);
                console.log(coords);
              }}
            >
              Name: {quiz.quizId}
              <p>Creator: {quiz.userId}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading quizzes...</p>
      )}
    </div>
  );
}

export default Quizzes;