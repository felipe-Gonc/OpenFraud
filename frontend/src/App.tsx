import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './routes/Login'
import Signin from './routes/Signin'

function App() {

  return (
    <div className='container mx-auto min-h-screen p-3'>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signin' element={<Signin/>}/>
      </Routes>
    </div>
  )
}

export default App
