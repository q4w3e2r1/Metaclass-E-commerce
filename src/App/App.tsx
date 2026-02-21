import { Outlet } from 'react-router'

import Header from './pages/Header/Header'
import styles from './App.module.scss'

function App() {

  return (
    <div className={styles.main}>
      <header className={styles.header}>
        <Header/>
      </header>
      <Outlet />
    </div>
  )
}

export default App
