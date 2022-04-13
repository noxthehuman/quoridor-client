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
        <Route path='/' element={<HomePage />}> </Route>
        <Route path='/auth/signup' element={<SignUp />}> </Route>
        <Route path='/auth/login' element=
        {
          <IsAnonymous>
            <LogIn />
          </IsAnonymous> }> 
          </Route>
        <Route path='/profile' element=
        {
          <IsPrivate>
            <Profile /> 
          </IsPrivate> }> </Route>
        <Route path='/game' element={<Game />}> </Route>
      </Routes>
    </div>
  )
}

export default App;
