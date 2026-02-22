
import { useState } from 'react'

import { Button, Input, MultiDropdown } from 'components'
import type {Option} from 'components/MultiDropdown'

import styles from './CatalogSerach.module.scss'

export const CatalogSearch = () => {

    const [searchValue, setSearchValue] = useState('')

    const mockOptions: Option[] = [
        { key: '1', value: 'Электроника' },
        { key: '2', value: 'Одежда' }
    ]

    const [selectedCategories, setSelectedCategories] = useState<Option[]>([])

    const getCategoriesTitle = (selected: Option[]): string => {
        if (selected.length === 0) {
            return 'Все категории'
        }
        if (selected.length === 1) {
            return selected[0].value
        }
        return `Выбрано: ${selected.length}`
    }

    const handleSearchChange = (value: string) => {
        setSearchValue(value)
        console.log("Search value:", value)
    }

    const handleSearchSubmit = () => {
        console.log("Searching for:", searchValue)
    }

    return (
        <div className={styles.root}>
            <div className={styles.search}>
                <Input 
                    value={searchValue}
                    placeholder='Search product' 
                    onChange={handleSearchChange}
                />
                <Button onClick={handleSearchSubmit}>Find now</Button>
            </div>
            <div className={styles.categories}>
            <MultiDropdown
                    options={mockOptions}
                    value={selectedCategories}
                    onChange={setSelectedCategories}
                    getTitle={getCategoriesTitle}
                    placeholder="Выберите категории"
                />
            </div>
        </div>
    )
}

export default CatalogSearch