import './App.css';
import {Routes, Route} from 'react-router-dom'
import HomePage from './pages/HomePage';
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn';
import Profile from './pages/Profile';
import Game from './pages/Game';
import IsPrivate from './components/IsPrivate';
import IsAnonymous from './components/IsAnonymous'

function App() {

  return (
    <div>
      <Routes>
        <Route path='/' element={<HomePage />}/>
        <Route path='/auth/signup' element={<SignUp />}/>
        <Route path='/auth/login' element=
        {
          <IsAnonymous>
            <LogIn />
          </IsAnonymous> 
          } /> 
        <Route path='/profile' element=
        {
          <IsPrivate>
            <Profile />
          </IsPrivate> }/>
          <Route path='/game' element={
            <IsPrivate>
              <Game />
            </IsPrivate>
          }/>
        <Route path='/game/:id' element={<Game />}/>
      </Routes>
    </div>
  )
}

export default App;
