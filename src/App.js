import './App.css';
import {Routes, Route} from 'react-router-dom'
import HomePage from './pages/HomePage';
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn';
import Profile from './pages/Profile';
import ViewGame from './pages/ViewGame';
import IsPrivate from './components/IsPrivate';
import IsAnonymous from './components/IsAnonymous'
import CreateGame from './pages/CreateGame';

function App() {

  return (
    <div className='App'>
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
          <Route path='/gamecreation' element={
            <IsPrivate>
              <CreateGame/>
            </IsPrivate>
          }/>
        <Route path={`/game/:gameId`} element={<ViewGame />}/>
      </Routes>
    </div>
  )
}

export default App;
