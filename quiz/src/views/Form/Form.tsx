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

    return(
        <section className='form'>
            <p>Form View / ADD</p>
            <article className='quiz-form__container'>
                <QuizForm newLat= {newLat} newLng={newLng} setNewLng={setNewLng} setNewLat={setNewLat}/>
            </article>
            <aside className='quiz-form__mapbox'>
                <MapBox setNewLng={setNewLng} setNewLat={setNewLat}/>
            </aside>

            <button onClick={goToMyProfil}>My profil</button>
        </section>
    )
}
export default Form