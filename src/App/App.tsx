import { Outlet } from 'react-router'

import './App.scss'
import Header from './pages/Header/Header'

function App() {

  return (
    <div>
      <header>
        <Header/>
      </header>
      <Outlet />
    </div>
  )
}

export default App
