import './App.css'
import {RouterProvider, createBrowserRouter } from 'react-router-dom'
import Landing from './views/Landing/Landing'
import Profil from './views/Profil/Profil'
import Game from './views/Game/Game'
import Form from './views/Form/Form'

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Landing/>
    },
    {
      path: '/profil',
      element: <Profil/>
    },
    {
      path:'/game',
      element: <Game/>
    },
    {
      path:'/form',
      element:<Form/>
    }

  ])

  return (
    <div className='App'>
      <RouterProvider router = { router }/>
    </div>
  )
}

export default App
