
import { useNavigate } from 'react-router-dom';
import styles from './Header.module.scss'

export  const Header = () => {

    const navigate = useNavigate();

    
    return(
        <header className={styles.header}>
            <div className={styles.container}>
                <div className={styles.logo}
                    onClick={()=>navigate("/product")}
                >
                    <img src={"/Frame.svg"} />
                    <img src={"/Lalasia.svg"} />
                </div>
                <ul className={styles.menu}>
                    <li className={styles.active}>Products</li>
                    <li>Categories</li>
                    <li>About us</li>
                </ul>
                <div className={styles["user-tools"]}>
                <img src={"/bag-2.svg"} />
                <img src={"/user.svg"} />
                </div>
            </div>
        </header>
    )
}


export default Header