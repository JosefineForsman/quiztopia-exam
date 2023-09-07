import MapBox from '../../components/MapBox/MapBox';
import QuizForm from '../../components/QuizForm/QuizForm';
import { useState } from 'react';
import './Form.css';
import { useNavigate } from 'react-router-dom';
function Form(){
    const [newLat, setNewLat] = useState<number>(0)
    const [newLng, setNewLng] = useState<number>(0)
    const navigate = useNavigate();

    const goToMyProfil = () =>{
        navigate('/profil')
    }
    const goToPlay = ()=>{
        navigate('/game')
    }

    return(
        <section className='form'>
            <header className='form-header'>
                <h1 className='text__title'>QUIZTOPIA</h1>
                <button className='form-btn' onClick={goToMyProfil}>My profil</button>
                <button className='form-btn' onClick={goToPlay}>Lets play!</button>
            </header>
            <article className='quiz-form__container'>
                <QuizForm newLat= {newLat} newLng={newLng} setNewLng={setNewLng} setNewLat={setNewLat}/>
            </article>
            <aside className='quiz-form__mapbox'>
                <MapBox setNewLng={setNewLng} setNewLat={setNewLat}/>
            </aside>

        </section>
    )
}
export default Form