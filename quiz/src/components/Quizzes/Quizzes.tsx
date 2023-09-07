import './Quizzes.css';
import { Quiz, Quizzes } from '../../interfaces';
import { getAllQuizzes } from '../../fetch/getAllquizzes';
import { useState, useEffect, useRef } from 'react';
import mapboxgl, { Map as MapGl } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN as string;

function Quizzes() {
  const [quizzes, setQuizzes] = useState<Quiz[] | null>([]);
  const [selectedCoords, setSelectedCoords] = useState<{ latitude: number; longitude: number }[]>([]);
  const [markers, setMarkers] = useState<mapboxgl.LngLat[]>([]);
  const [showMap, setShowMap] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('');
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
      style: 'mapbox://styles/josse123/clm929sj5012g01quf59se9j1',
      center: [selectedCoords[0].longitude, selectedCoords[0].latitude],
      zoom: 12,
    });

    if(markerRef.current){
      markerRef.current.remove()
    }

    selectedCoords.forEach((coords) => {
      new mapboxgl.Marker({color: '#ff316b'})
      .setLngLat([coords.longitude, coords.latitude])
      .addTo(mapRef.current as MapGl);
      setMarkers(markers);
      console.log(coords.longitude, coords.latitude)
    });

  }, [selectedCoords]);

  const handleQuiz = (quiz:Quiz)=>{
    {
      if (errorShown) {
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
        setSelectedCoords([]);
        setShowMap(false);
      }else{
        setSelectedCoords(coords);
        setShowMap(true);
        setErrorMessage('');
        setErrorShown(false);

      }
    }
  }

  return (
    <div>
      <h2 className='quizzes__title'>All quizzes</h2>
      {errorMessage && (
        <div>
          <h3 className="error">{errorMessage}</h3>
        </div>
      )}
       {showMap && (
      <div className='map-container'ref={mapContainer} style={{ height: '500px' }}></div>
      )}
      {quizzes ? (
        <div className='quizzes-container'>
          {quizzes.map((quiz, index) => (
            <aside
            className={'quizzes'}
              key={index}
              onClick={ ()=> handleQuiz(quiz) }
            >
              <p className='quizzes__body-text'>Username: {quiz.username}</p>
              <p className='quizzes__body-text'>Creator: {quiz.quizId}</p>
            </aside>
          ))}
          </div>
       ): (
        <p>Loading quizzes...</p>
      )}
    </div>
  );
}


export default Quizzes;