import './App.css';
import {Routes, Route} from 'react-router-dom'
import HomePage from './pages/HomePage';
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn';
import Profile from './pages/Profile';
import Game from './pages/Game';
import IsPrivate from './components/IsPrivate';
import IsAnonymous from './components/IsAnonymous'
import CreateGameForm from './components/CreateGameForm';

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
          <Route path='/profile/newgame' element={
            <IsPrivate>
              <CreateGameForm />
            </IsPrivate>
          }/>
        <Route path='/game' element={<Game />}/>
      </Routes>
    </div>
  )
}

export default App;
