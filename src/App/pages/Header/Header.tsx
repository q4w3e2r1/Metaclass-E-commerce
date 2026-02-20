
import styles from './Header.module.scss'

export  const Header = () => {
    return(
        <div className={styles.contaier}>
            <div className={styles.logo}>
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
    )
}


export default Header