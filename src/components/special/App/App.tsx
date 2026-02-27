import { Outlet } from 'react-router'

import Header from '@pages/Header'
import styles from './App.module.scss'

function App() {

  return (
    <div className={styles.main}>
        <Header/>
        <Outlet />
    </div>
  )
}

export default App
