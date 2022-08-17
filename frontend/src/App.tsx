import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Homepage from './pages/homepage/Homepage'
import Message from './pages/message/Message'
import MyNetwork from './pages/my-network/MyNetwork'
import Profile from './pages/profile/Profile'
import SignIn from './pages/sign-in/SignIn'
import SignUp from './pages/sign-up/SignUp'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path='' element={< />} /> */}
        <Route path='/' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/feed' element={<Homepage />} />
        <Route path='/mynetwork' element={<MyNetwork />} />
        <Route path='/message' element={<Message />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
