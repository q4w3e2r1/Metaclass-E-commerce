

//import { Button, Input, MultiDrowdown } from 'components'
import styles from './CatalogSerach.module.scss'
import { Button, Input, MultiDrowdown } from '../../../../../components'

export const CatalogSearch = () => {
    return (
        <div className={styles.root}>
            <div className={styles.search}>
                <Input value='' placeholder='Search product' onChange={()=> console.log("InputSearchChange")}></Input>
                <Button>Find now</Button>
            </div>
            <div className={styles.categories}>MultiDrowdown</div>
        </div>
    )
}

export default CatalogSearch