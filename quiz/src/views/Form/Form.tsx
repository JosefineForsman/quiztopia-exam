import MapBox from '../../components/MapBox/MapBox';
import QuizForm from '../../components/QuizForm/QuizForm';
import './Form.css';
import { useNavigate } from 'react-router-dom';
function Form(){
    const navigate = useNavigate();

    const goToMyProfil = () =>{
        navigate('/profil')
    }

    return(
        <section className='form'>
            <p>Form View / ADD</p>
            <article className='quiz-form__container'>
                <QuizForm/>
            </article>
            <aside className='quiz-form__mapbox'>
                <MapBox/>
            </aside>

            <button onClick={goToMyProfil}>My profil</button>
        </section>
    )
}
export default Form