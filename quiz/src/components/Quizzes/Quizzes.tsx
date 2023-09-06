import './Quizzes.css';
import { Quiz, Quizzes } from '../../interfaces';
import { getAllQuizzes } from '../../Api/getAllquizzes';
import { useState, useEffect, useRef } from 'react';
import mapboxgl, { Map as MapGl } from 'mapbox-gl';
import { deleteUserQuizById } from '../../Api/deleteQuiz';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN as string;

function Quizzes() {
  const [quizzes, setQuizzes] = useState<Quiz[] | null>([]);
  const [selectedCoords, setSelectedCoords] = useState<{ latitude: number; longitude: number }[]>([]);
  const [markers, setMarkers] = useState<mapboxgl.LngLat[]>([]);
  const [userId, setUserId] = useState<string>('');
  const [quizId, setQuizId] = useState<string>('');
  const [showMap, setShowMap] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('');
  // Lägg till en ny state-variabel för att spåra om felmeddelandet har visats.
const [errorShown, setErrorShown] = useState<boolean>(false);

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
        setErrorMessage('Something went wrong')
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

  const handleQuiz = (quiz:Quiz)=>{
    {
      if (errorShown) {
        // Återställ felmeddelandet om det har visats tidigare
        setErrorShown(false);
      }
      const coords = quiz.questions.map((question) => ({
        latitude: parseFloat(question.location.latitude),
        longitude: parseFloat(question.location.longitude),
      }));
      let hasInvalidCoords = false;

      coords.forEach((coord) => {
        if (
          isNaN(coord.latitude) ||
          isNaN(coord.longitude) ||
          coord.longitude < -180 ||
          coord.longitude > 180
        ) {
          hasInvalidCoords = true;
        }
      });
    
      if (hasInvalidCoords) {
        setErrorMessage('Invalid coordinates, could not run maps. Pick another quiz.');
        setErrorShown(true);
        return;
      }
      setSelectedCoords(coords);
      setShowMap(true);
    }
  }

  return (
    <div>
      <h2>Quizzes</h2>
      {errorMessage && (
        <div>
          <h3 className="error">{errorMessage}</h3>
          <button onClick={() => {
            setErrorMessage(''); // Återställ felmeddelandet
            setSelectedCoords([]); // Återställ koordinater
            setUserId(''); // Återställ användar-ID
            setQuizId(''); // Återställ quiz-ID
            setShowMap(false); // Dölj kartan
          }}>
            Reset
          </button>
        </div>
      )}
       {showMap && (
      <div ref={mapContainer} style={{ height: '500px' }}></div>
      )}
      {quizzes ? (
        <ul>
          {quizzes.map((quiz, index) => (
            <li
              className='quizzes'
              key={index}
              onClick={ ()=> handleQuiz(quiz) }
            >
              Name: {quiz.username}
              <p>Creator: {quiz.quizId}</p>
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